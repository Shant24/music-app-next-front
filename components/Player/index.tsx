import React, { useCallback } from 'react';
import { Box, Grid, IconButton } from '@mui/material';
import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material';
import { createPortal } from 'react-dom';

import { getStaticFilePath } from '../../helpers';
import { usePlayerContext } from '../../context/Player';
import TrackProgress from '../TrackProgress';
import styles from './styles.module.scss';

const Player = () => {
  const { audioRef, activeTrack, isPlaying, volume, duration, currentTime, toggleTrack, setVolume, setCurrentTime } =
    usePlayerContext();

  const handleChangeVolume = useCallback(
    (value: number) => {
      if (audioRef.current) {
        audioRef.current.volume = value / 100;
      }
      setVolume(value);
    },
    [audioRef, setVolume],
  );

  const handleChangeCurrentTime = useCallback(
    (value: number) => {
      if (audioRef.current) {
        audioRef.current.currentTime = value;
      }
      setCurrentTime(value);
    },
    [audioRef, setCurrentTime],
  );

  return createPortal(
    <div className={styles.playerContainer}>
      <IconButton onClick={toggleTrack}>{isPlaying ? <Pause /> : <PlayArrow />}</IconButton>

      <Grid className={styles.informationContainer} container direction="row">
        <Box className={styles.photo}>
          <img src={getStaticFilePath(activeTrack!.picture)} alt={`${activeTrack?.name}-photo`} />
        </Box>
        <Grid className={styles.trackName} direction="column">
          <div>{activeTrack?.name}</div>
          <div>{activeTrack?.artist}</div>
        </Grid>
      </Grid>

      <TrackProgress
        left={currentTime}
        right={duration}
        showProgressTime
        fullWidth
        onChange={handleChangeCurrentTime}
      />

      <VolumeUp className={styles.volumeUpButton} />

      <TrackProgress left={volume} right={100} onChange={handleChangeVolume} />
    </div>,
    document.body,
  );
};

const PlayerWrapper = () => {
  const { activeTrack } = usePlayerContext();

  return activeTrack ? <Player /> : null;
};

export default PlayerWrapper;
