import { createContext } from 'react';
import type { Dispatch, MutableRefObject, SetStateAction } from 'react';
import type { ITrack } from '../../types/track';
import { noop } from '../../helpers';

export interface PlayerContextProps {
  audioRef: MutableRefObject<HTMLAudioElement | null | undefined>;
  activeTrack: ITrack | null;
  isPlaying: boolean;
  volume: number;
  duration: number;
  currentTime: number;
  playTrack: () => Promise<void>;
  pauseTrack: () => void;
  toggleTrack: () => void;
  setActiveTrack: Dispatch<SetStateAction<ITrack | null>>;
  setVolume: Dispatch<SetStateAction<number>>;
  setCurrentTime: Dispatch<SetStateAction<number>>;
  resetTrackState: () => void;
}

const initialState: PlayerContextProps = {
  audioRef: { current: null },
  activeTrack: null,
  isPlaying: false,
  volume: 50,
  duration: 0,
  currentTime: 0,
  playTrack: () => Promise.resolve(),
  pauseTrack: noop,
  toggleTrack: noop,
  setActiveTrack: () => null,
  setVolume: () => 50,
  setCurrentTime: () => 0,
  resetTrackState: noop,
};

const PlayerContext = createContext<PlayerContextProps>(initialState);

export default PlayerContext;
