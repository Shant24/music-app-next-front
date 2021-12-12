import React, { memo } from 'react';
import styles from './styles.module.scss';
import { Slider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { formatTime } from '../../helpers/timeHelper';

const useStyles = makeStyles({
  root: {
    width: '200px',
    color: '#3F51B5',
    height: 8,
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: 0,
    marginLeft: -2,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
  },
});

interface TrackProgressProps {
  left: number;
  right: number;
  disabled?: boolean;
  showProgressTime?: boolean;
  onChange: (value: number) => void;
}

const TrackProgress = (props: TrackProgressProps) => {
  const { left = 0, right = 0, disabled = false, showProgressTime = false, onChange } = props;
  const classes = useStyles();

  return (
    <div className={styles.trackProgressContainer}>
      <Slider
        classes={classes}
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        defaultValue={left}
        min={0}
        max={right}
        value={left}
        onChange={(e, value) => onChange(value as number)}
        disabled={disabled}
      />
      {showProgressTime && (
        <div className={styles.progressTime}>
          {formatTime(left)} / {formatTime(right)}
        </div>
      )}
    </div>
  );
};

export default memo(TrackProgress);
