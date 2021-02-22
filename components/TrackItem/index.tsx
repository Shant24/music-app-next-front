import React, { memo } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { Card, Grid, IconButton } from '@material-ui/core';
import { Delete, Pause, PlayArrow } from '@material-ui/icons';

import { ITrack } from '../../types/track';
import styles from './styles.module.scss';
import { useAction, useTypedSelector } from '../../hooks';

interface TrackItemProps {
  track: ITrack;
  active?: boolean;
}

const TrackItem: React.FC<TrackItemProps> = ({ track, active = false }) => {
  const { playTrack, pauseTrack, setActiveTrack } = useAction();

  const handlePlay = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setActiveTrack(track);
    playTrack();
  };

  return (
    <Link href={`/tracks/${track._id}`}>
      <Card className={styles.track}>
        <IconButton onClick={handlePlay}>
          {active ? <Pause /> : <PlayArrow />}
        </IconButton>

        <div className={styles.photoWrapper}>
          <img
            className={styles.photo}
            src={`${process.env.API_HOST}/${track.picture}`}
            alt={`${track.name}-photo`}
          />
        </div>

        <Grid className={styles.trackName} container direction="column">
          <div>{track.name}</div>
          <div>{track.artist}</div>
        </Grid>

        {active && <div className={styles.trackTime}>02:42 / 03:22</div>}

        <IconButton
          className={styles.trackDeleteBtn}
          onClick={(e) => e.stopPropagation()}
        >
          <Delete />
        </IconButton>
      </Card>
    </Link>
  );
};

export default memo(TrackItem);
