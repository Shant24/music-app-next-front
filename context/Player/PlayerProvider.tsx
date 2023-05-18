import React, { useCallback, useEffect, useRef, useState } from 'react';
import type { FC } from 'react';
import type { ITrack } from '../../types/track';
import { getStaticFilePath } from '../../helpers';
import PlayerContext from './PlayerContext';

const PlayerProvider: FC = ({ children }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [activeTrack, setActiveTrack] = useState<ITrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const playTrack = useCallback(async () => {
    setIsPlaying(true);
    await audioRef.current?.play();
  }, []);

  const pauseTrack = useCallback(() => {
    setIsPlaying(false);
    audioRef.current?.pause();
  }, []);

  const toggleTrack = useCallback(() => {
    if (isPlaying) {
      pauseTrack();
    } else {
      playTrack();
    }
  }, [isPlaying, pauseTrack, playTrack]);

  const resetTrackState = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }
    setActiveTrack(null);
    setCurrentTime(0);
    setDuration(0);
  }, []);

  useEffect(() => {
    if (activeTrack) {
      audioRef.current = new Audio();
    } else {
      pauseTrack();
      audioRef.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTrack, pauseTrack]);

  useEffect(() => {
    const loadedMetadata = () => {
      if (audioRef.current) {
        setDuration(Math.ceil(audioRef.current.duration));
      }
    };

    const timeUpdate = () => {
      if (audioRef.current) {
        setCurrentTime(Math.ceil(audioRef.current.currentTime));
      }
    };

    if (activeTrack && audioRef.current) {
      audioRef.current.id = activeTrack._id;
      audioRef.current.src = getStaticFilePath(activeTrack.audio);
      audioRef.current.volume = volume / 100;
      audioRef.current.addEventListener('loadedmetadata', loadedMetadata);
      audioRef.current.addEventListener('timeupdate', timeUpdate);
      audioRef.current.play();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('loadedmetadata', loadedMetadata);
        audioRef.current.removeEventListener('timeupdate', timeUpdate);
        audioRef.current.pause();
        audioRef.current.src = '';
        audioRef.current.remove();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTrack, resetTrackState, setCurrentTime, setDuration]);

  useEffect(() => {
    const onEnded = () => {
      pauseTrack();
      setCurrentTime(0);
    };

    audioRef.current?.addEventListener('play', playTrack);
    audioRef.current?.addEventListener('pause', pauseTrack);
    audioRef.current?.addEventListener('ended', onEnded);

    return () => {
      audioRef.current?.removeEventListener('play', playTrack);
      audioRef.current?.removeEventListener('pause', pauseTrack);
      audioRef.current?.removeEventListener('ended', onEnded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioRef]);

  return (
    <PlayerContext.Provider
      value={{
        audioRef,
        activeTrack,
        isPlaying,
        volume,
        currentTime,
        duration,
        playTrack,
        pauseTrack,
        toggleTrack,
        setActiveTrack,
        setVolume,
        setCurrentTime,
        resetTrackState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerProvider;
