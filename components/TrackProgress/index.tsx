import React, { memo } from 'react';
import cls from 'classnames';
import { Slider } from '@mui/material';
import { DefaultTheme, makeStyles } from '@mui/styles';
import { formatTime } from '../../helpers';
import styles from './styles.module.scss';

const useStyles = makeStyles<DefaultTheme, { fullWidth?: boolean }>({
  root: {
    width: '200px',
    color: '#3F51B5',
    height: 8,
    flex: ({ fullWidth }) => (fullWidth ? 1 : 'unset'),
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
  fullWidth?: boolean;
  disabled?: boolean;
  showProgressTime?: boolean;
  onChange: (value: number) => void;
}

const TrackProgress = (props: TrackProgressProps) => {
  const { left = 0, right = 0, fullWidth = false, disabled = false, showProgressTime = false, onChange } = props;
  const classes = useStyles({ fullWidth });

  return (
    <div className={cls(styles.trackProgressContainer, { [styles.fullWidth]: fullWidth })}>
      <Slider
        classes={classes}
        valueLabelDisplay="auto"
        aria-label="pretto slider"
        defaultValue={left}
        valueLabelFormat={showProgressTime ? formatTime : undefined}
        min={0}
        max={right}
        value={left}
        onChange={(e, value) => onChange(value as number)}
        disabled={disabled}
      />
      {showProgressTime && (
        <div className={styles.progressTime}>
          <span>{formatTime(left)}</span>-<span>{formatTime(right)}</span>
        </div>
      )}
    </div>
  );
};

export default memo(TrackProgress);
