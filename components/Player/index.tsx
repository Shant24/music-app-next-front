import React, { memo, useEffect } from 'react';
import { Grid, IconButton } from '@material-ui/core';
import { Pause, PlayArrow, VolumeUp } from '@material-ui/icons';
import { useAction, useTypedSelector } from '../../hooks';

import styles from './styles.module.scss';
import TrackProgress from '../TrackProgress';

let audio;

const Player = () => {
  const { pause, active, volume, duration, currentTime } = useTypedSelector((state) => state.player);
  const { playTrack, pauseTrack, setCurrentTime, setDuration, setVolume } = useAction();

  useEffect(() => {
    if (!audio) {
      audio = new Audio();
    }
  }, []);

  useEffect(() => {
    if (audio) {
      setAudio();
    }
  }, [active]);

  const setAudio = () => {
    if (active) {
      audio.src = `${process.env.API_HOST}/${active.audio}`;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration));
      };
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime));
      };

      playTrack();
      audio.play();
    }
  };

  const handlePlay = () => {
    if (pause) {
      playTrack();
      audio.play();
    } else {
      pauseTrack();
      audio.pause();
    }
  };

  const handleChangeVolume = (value: number) => {
    audio.volume = value / 100;
    setVolume(value);
  };

  const handleChangeCurrentTime = (value: number) => {
    audio.currentTime = value;
    setCurrentTime(value);
  };

  return (
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
        onChange={handleChangeCurrentTime}
      />

      <VolumeUp className={styles.volumeUpButton} />

      <TrackProgress
        left={volume}
        right={100}
        onChange={handleChangeVolume}
        showProgressTime={false}
      />
    </div>
  );
};

export default memo(Player);
