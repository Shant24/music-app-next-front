import React, { memo, MouseEvent } from 'react';
import Link from 'next/link';
import { Card, Grid, IconButton } from '@mui/material';
import { Delete, Pause, PlayArrow } from '@mui/icons-material';

import { ITrack } from '../../types/track';
import { useAction } from '../../hooks';
import styles from './styles.module.scss';

interface TrackItemProps {
  track: ITrack;
  active?: boolean;
}

const TrackItem = ({ track, active = false }: TrackItemProps) => {
  const { playTrack, setActiveTrack, removeTrack } = useAction();

  const handlePlay = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setActiveTrack(track);
    playTrack();
  };

  const handleRemove = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    removeTrack(track._id);
  };

  return (
    <Link href={`/tracks/${track._id}`} passHref>
      <Card className={styles.track}>
        <IconButton onClick={handlePlay}>
          {active ? <Pause /> : <PlayArrow />}
        </IconButton>

        <div className={styles.photoWrapper}>
          <img
            className={styles.photo}
            src={`${process.env.NEXT_PUBLIC_API_URL}/${track.picture}`}
            alt={`${track.name}-photo`}
          />
        </div>

        <Grid className={styles.trackName} container direction="column">
          <div>{track.name}</div>
          <div>{track.artist}</div>
        </Grid>

        {active && <div className={styles.trackTime}>02:42 / 03:22</div>}

        <IconButton className={styles.trackDeleteBtn} onClick={handleRemove}>
          <Delete />
        </IconButton>
      </Card>
    </Link>
  );
};

export default memo(TrackItem);
