import React, { memo, useEffect, useState } from 'react';
import { Grid, IconButton } from '@material-ui/core';
import { Pause, PlayArrow, VolumeUp } from '@material-ui/icons';
import { useTypedSelector, useAction } from '../../hooks';

import styles from './styles.module.scss';
import TrackProgress from '../TrackProgress';
import { GetServerSideProps } from 'next';

let audio;

const Player: React.FC = () => {
  const [left, setLeft] = useState<number>(0);
  const { pause, active, volume, duration, currentTime } = useTypedSelector(
    (state) => state.player
  );
  const {
    playTrack,
    pauseTrack,
    setCurrentTime,
    setActiveTrack,
    setDuration,
    setVolume,
  } = useAction();

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

  const handleChangeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100;
    setVolume(Number(e.target.value));
  };

  const handleChangeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value);
    setCurrentTime(Number(e.target.value));
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
