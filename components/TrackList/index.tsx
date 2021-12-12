import React, { memo } from 'react';
import { Box, Grid } from '@mui/material';

import { ITrack } from '../../types/track';
import TrackItem from '../TrackItem';

interface TrackListProps {
  tracks: ITrack[];
}

const TrackList = ({ tracks }: TrackListProps) => (
  <Grid container direction="column">
    <Box p={2}>
      {tracks.map((track) => (
        <TrackItem key={track._id} track={track} />
      ))}
    </Box>
  </Grid>
);

export default memo(TrackList);
