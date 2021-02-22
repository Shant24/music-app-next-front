import React, { memo, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Button, Grid, TextField } from '@material-ui/core';
import { useInput } from '../../hooks';

import styles from '../../styles/CreateTrack.module.scss';
import MainLayout from '../../layouts/MainLayout';
import StepWrapper from '../../components/StepWrapper';
import FileUpload from '../../components/FileUpload';

const Create: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [picture, setPicture] = useState<object | null>(null);
  const [audio, setAudio] = useState<object | null>(null);
  const name = useInput('');
  const artist = useInput('');
  const text = useInput('');
  const router = useRouter();

  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleNext = () => setActiveStep((prev) => prev + 1);

  const handleFinish = () => {
    const body = {
      name: name.value,
      artist: artist.value,
      text: text.value,
      picture,
      audio
    };

    axios
      .post(`${process.env.API_HOST}/tracks`, body)
      .then((response) => router.push('/tracks'))
      .catch((err) => console.log(err));
  };

  return (
    <MainLayout title="Upload music - Music App">
      <div className={styles.createTrackContainer}>
        <StepWrapper activeStep={activeStep}>
          <Grid
            container
            direction="column"
            className={styles.createTrackStepContainer}
          >
            {activeStep === 0 && (
              <>
                <div className={styles.fieldWrapper}>
                  <TextField label="Name of Track" {...name} />
                </div>
                <div className={styles.fieldWrapper}>
                  <TextField label="Name of Artist" {...artist} />
                </div>
                <div className={styles.fieldWrapper}>
                  <TextField
                    label="Text of Track"
                    multiline
                    rows={3}
                    {...text}
                  />
                </div>
              </>
            )}
            {activeStep === 1 && (
              <>
                <FileUpload setFile={setPicture} accept="image/*">
                  <Button variant="contained">Send Photo</Button>
                </FileUpload>

                {picture && <div>Photo - {picture.name}</div>}
              </>
            )}
            {activeStep === 2 && (
              <>
                <FileUpload setFile={setAudio} accept="audio/*">
                  <Button variant="contained">Send Audio</Button>
                </FileUpload>

                {audio && <div>Audio - {audio.name}</div>}
              </>
            )}
          </Grid>
        </StepWrapper>

        <Grid
          className={styles.buttonsContainer}
          container
          justifyContent="center"
        >
          <Button
            onClick={handleBack}
            variant="contained"
            disabled={activeStep === 0}
          >
            Back
          </Button>
          {activeStep < 2 ? (
            <Button onClick={handleNext} variant="contained">
              Next
            </Button>
          ) : (
            <Button onClick={handleFinish} variant="contained">
              Finish
            </Button>
          )}
        </Grid>
      </div>
    </MainLayout>
  );
};

export default memo(Create);
