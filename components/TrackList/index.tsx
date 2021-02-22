import React, { memo } from 'react';
import { Box, Grid } from '@material-ui/core';

import { ITrack } from '../../types/track';
import TrackItem from '../TrackItem';

interface TrackListProps {
  tracks: ITrack[];
}

const TrackList: React.FC<TrackListProps> = ({ tracks }) => {
  return (
    <Grid container direction="column">
      <Box p={2}>
        {tracks.map((track, index) => (
          <TrackItem key={track._id} track={track} />
        ))}
      </Box>
    </Grid>
  );
};

export default memo(TrackList);
