import React, { memo, useEffect, useRef } from 'react';
import { Grid, IconButton } from '@mui/material';
import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material';
import { createPortal } from 'react-dom';

import { useAction, useTypedSelector } from '../../hooks';
import TrackProgress from '../TrackProgress';
import styles from './styles.module.scss';

const Player = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { pause, active, volume, duration, currentTime } = useTypedSelector((state) => state.player);
  const { playTrack, pauseTrack, setCurrentTime, setDuration, setVolume, setTrackDefaultData } = useAction();

  useEffect(() => {
    if (active) {
      // @ts-ignore
      audioRef.current = new Audio();
    } else {
      pauseTrack();
      // @ts-ignore
      audioRef.current = null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

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

    if (active && audioRef.current) {
      audioRef.current.src = `${process.env.NEXT_PUBLIC_API_URL}/${active.audio}`;
      audioRef.current.volume = volume / 100;
      audioRef.current.addEventListener('loadedmetadata', loadedMetadata);
      audioRef.current.addEventListener('timeupdate', timeUpdate);
      playTrack();
      audioRef.current.play();
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('loadedmetadata', loadedMetadata);
        audioRef.current.removeEventListener('timeupdate', timeUpdate);
        pauseTrack();
        audioRef.current.pause();
        audioRef.current.src = '';
        setTrackDefaultData();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const handlePlay = async () => {
    if (pause) {
      playTrack();
      await audioRef.current?.play();
    } else {
      pauseTrack();
      audioRef.current?.pause();
    }
  };

  const handleChangeVolume = (value: number) => {
    if (audioRef.current) {
      audioRef.current.volume = value / 100;
    }
    setVolume(value);
  };

  const handleChangeCurrentTime = (value: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value;
    }
    setCurrentTime(value);
  };

  if (!active) {
    return null;
  }

  return createPortal((
    <div className={styles.playerContainer}>
      <IconButton onClick={handlePlay}>
        {pause ? <PlayArrow /> : <Pause />}
      </IconButton>

      <Grid className={styles.trackName} container direction="column">
        <div>{active?.name}</div>
        <div>{active?.artist}</div>
      </Grid>

      <TrackProgress
        left={currentTime}
        right={duration}
        showProgressTime
        onChange={handleChangeCurrentTime}
      />

      <VolumeUp className={styles.volumeUpButton} />

      <TrackProgress
        left={volume}
        right={100}
        onChange={handleChangeVolume}
      />
    </div>
  ), document.body);
};

export default memo(Player);
