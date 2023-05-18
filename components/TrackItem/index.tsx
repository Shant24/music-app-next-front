import React, { memo, MouseEvent } from 'react';
import Link from 'next/link';
import cls from 'classnames';
import { Card, Grid, IconButton } from '@mui/material';
import { Delete, Pause, PlayArrow } from '@mui/icons-material';

import type { ITrack } from '../../types/track';
import { useAction } from '../../hooks';
import { formatTime, getStaticFilePath } from '../../helpers';
import { usePlayerContext } from '../../context/Player';
import styles from './styles.module.scss';

interface TrackItemProps {
  track: ITrack;
}

const TrackItem = ({ track }: TrackItemProps) => {
  const { removeTrack } = useAction();
  const { activeTrack, isPlaying, duration, currentTime, playTrack, toggleTrack, setActiveTrack } = usePlayerContext();
  const isTrackActive = activeTrack?._id === track._id;

  const handlePlay = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (isTrackActive) {
      toggleTrack();
    } else {
      setActiveTrack(track);
      playTrack();
    }
  };

  const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    removeTrack(track._id);
  };

  return (
    <Link href={`/tracks/${track._id}`} passHref>
      <Card className={cls(styles.track, { [styles.activeTrack]: isTrackActive })}>
        <IconButton onClick={handlePlay}>
          {isTrackActive ? isPlaying ? <Pause /> : <PlayArrow /> : <PlayArrow />}
        </IconButton>

        <div className={styles.photoWrapper}>
          <img className={styles.photo} src={getStaticFilePath(track.picture)} alt={`${track.name}-photo`} />
        </div>

        <Grid className={styles.trackName} container direction="column">
          <div>{track.name}</div>
          <div>{track.artist}</div>
        </Grid>

        {isTrackActive && (
          <div className={styles.trackTime}>
            <span>{formatTime(currentTime)}</span>-<span>{formatTime(duration)}</span>
          </div>
        )}

        <IconButton className={styles.trackDeleteBtn} onClick={handleRemove}>
          <Delete />
        </IconButton>
      </Card>
    </Link>
  );
};

export default memo(TrackItem);
