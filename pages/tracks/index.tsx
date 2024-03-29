import React, { memo, useState } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { Box, Button, Card, Grid, TextField } from '@mui/material';

import { useTypedSelector } from '../../hooks';
import { NextThunkDispatch, wrapper } from '../../store';
import { fetchTracks, searchTracks } from '../../store/actions';
import MainLayout from '../../layouts/MainLayout';
import TrackList from '../../components/TrackList';
import styles from '../../styles/TracksPage.module.scss';

const Track: React.FC = () => {
  const { tracks, error } = useTypedSelector((state) => state.track);
  const [query, setQuery] = useState<string>('');
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(null);

  const dispatch = useDispatch() as NextThunkDispatch;

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);

    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(async () => {
        await dispatch(await searchTracks(e.target.value));
      }, 500),
    );
  };

  if (error) {
    return (
      <MainLayout>
        <h1>{error}</h1>
      </MainLayout>
    );
  }

  return (
    <MainLayout title="List of Tracks - Music App">
      <Box p={2}>
        <Grid container justifyContent="center">
          <Box m={2}>
            <Card>
              <Box p={2}>
                <Grid container justifyContent="space-between" style={{ width: '80vw' }}>
                  <h1>List of tracks</h1>
                  <Link href="/tracks/create" passHref>
                    <Button>Upload</Button>
                  </Link>
                </Grid>
              </Box>

              <Grid container className={styles.searchContainer}>
                <TextField label="Search" fullWidth value={query} onChange={handleSearch} />
              </Grid>

              <TrackList tracks={tracks} />
            </Card>
          </Box>
        </Grid>
      </Box>
    </MainLayout>
  );
};

export default memo(Track);

export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps((store) => async () => {
  const dispatch = store.dispatch as NextThunkDispatch;

  let tracks: any = [];

  try {
    tracks = await fetchTracks();
  } catch (error: any) {
    console.log('error', error);
    console.log('error.message', error.message);
  }

  await dispatch(tracks);

  return { props: {} };
});
