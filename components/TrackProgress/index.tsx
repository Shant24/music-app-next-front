import React, { memo } from 'react';
import styles from './styles.module.scss';
import { Slider, withStyles } from '@material-ui/core';

const PrettoSlider = withStyles({
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
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
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
})(Slider);

interface TrackProgressProps {
  left: number;
  right: number;
  disabled?: boolean;
  showProgressTime?: boolean;
  onChange: (value: number) => void;
}

const TrackProgress = (props: TrackProgressProps) => {
  const {
    left = 0,
    right = 0,
    disabled = false,
    showProgressTime = true,
    onChange,
  } = props;

  return (
    <div className={styles.trackProgressContainer}>
      <PrettoSlider
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
          {left} / {right}
        </div>
      )}
    </div>
  );
};

export default memo(TrackProgress);
