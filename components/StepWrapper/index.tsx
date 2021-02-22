import React, { memo } from 'react';
import {
  Card,
  Container,
  Grid,
  Step,
  StepLabel,
  Stepper,
} from '@material-ui/core';

import styles from './styles.module.scss';

const steps = ['Track Information', 'Upload Photo', 'Upload Audio'];

interface StepWrapperProps {
  activeStep: number;
}

const StepWrapper: React.FC<StepWrapperProps> = ({ activeStep, children }) => {
  return (
    <Container className={styles.stepWrapper}>
      <Stepper activeStep={activeStep}>
        {steps.map((step, index) => (
          <Step
            key={`${step.split(' ').join('')}${index}`}
            completed={activeStep > index}
          >
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Grid
        container
        justifyContent="center"
        style={{ margin: '70px 0', minHeight: '270px' }}
      >
        <Card style={{ width: '600px' }}>{children}</Card>
      </Grid>
    </Container>
  );
};

export default memo(StepWrapper);
