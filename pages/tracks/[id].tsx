import React, { memo, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Link from 'next/link';
import axios from 'axios';
import { Box, Button, Grid, TextField } from '@mui/material';
import { useInput } from '../../hooks';

import type { ITrack } from '../../types/track';
import { getStaticFilePath, wordsForKeyWord } from '../../helpers';
import MainLayout from '../../layouts/MainLayout';
import styles from '../../styles/TrackPage.module.scss';

interface TrackPageProps {
  serverTrack: ITrack;
}

const TrackPage: React.FC<TrackPageProps> = ({ serverTrack }) => {
  const router = useRouter();
  const [track, setTrack] = useState<ITrack>(serverTrack);
  const username = useInput('');
  const text = useInput('');

  const handleSendComment = async () => {
    const formData = new FormData();
    formData.append('username', username.value);
    formData.append('text', text.value);
    formData.append('trackId', track._id);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tracks/comment`, {
        username: username.value,
        text: text.value,
        trackId: track._id,
      });
      setTrack({ ...track, comments: [...track.comments, response.data] });
    } catch (error) {
      console.log(error);
      router.back();
    }
  };

  if (!track) {
    return (
      <MainLayout>
        <>Loading...</>
      </MainLayout>
    );
  }

  return (
    <MainLayout
      title={`${track.artist} - ${track.name} - Music App`}
      keywords={`${track.name}, ${track.artist}, ${track.text}, ${wordsForKeyWord(track.name)}, ${wordsForKeyWord(
        track.artist,
      )}, ${wordsForKeyWord(track.text)}`}
    >
      <Box p={2}>
        <Link href="/tracks" passHref>
          <Button className={styles.backButton} variant="contained">
            Track list page
          </Button>
        </Link>

        <Grid container className={styles.trackInfoContainer}>
          <div className={styles.TrackImageWrapper}>
            <img src={getStaticFilePath(track.picture)} alt={`${track.name}-photo`} />
          </div>

          <div className={styles.trackNameContainer}>
            <h1>Name - {track.name}</h1>
            <h1>Artist - {track.artist}</h1>
            <h1>Listens - {track.listens}</h1>
          </div>
        </Grid>

        <div className={styles.trackTextContainer}>
          <h1>Text of the Track</h1>
          <pre>{track.text}</pre>
        </div>

        <div className={styles.commentsBlok}>
          <h1>Comments</h1>

          <Grid container className={styles.newCommentContainer} direction="column">
            <TextField label="Your name" fullWidth {...username} />
            <TextField label="Comment" fullWidth multiline rows={4} {...text} />
            <Button variant="contained" onClick={handleSendComment}>
              Send
            </Button>
          </Grid>

          {track.comments?.length > 0 && (
            <div className={styles.commentsContainer}>
              {track.comments.map((comment) => (
                <div key={comment._id} className={styles.comment}>
                  <div className={styles.commentUsername}>Author - {comment.username}</div>
                  <div className={styles.commentText}>Comment - {comment.text}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Box>
    </MainLayout>
  );
};

export default memo(TrackPage);

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tracks/${params?.id || ''}`);

  if (!response.data) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      serverTrack: response.data,
    },
  };
};
