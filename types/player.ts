import { ITrack } from './track';
import { IHydrate } from './index';

export interface PlayerState {
  active: null | ITrack;
  volume: number;
  duration: number;
  currentTime: number;
  pause: boolean;
}

export enum PlayerActionTypes {
  PLAY = 'PLAY',
  PAUSE = 'PAUSE',
  SET_ACTIVE = 'SET_ACTIVE',
  SET_DURATION = 'SET_DURATION',
  SET_CURRENT_TIME = 'SET_CURRENT_TIME',
  SET_VOLUME = 'SET_VOLUME',
  SET_DEFAULT_DATA = 'SET_DEFAULT_DATA',
}

interface PlayAction {
  type: PlayerActionTypes.PLAY;
}

interface PauseAction {
  type: PlayerActionTypes.PAUSE;
}

interface SetActiveAction {
  type: PlayerActionTypes.SET_ACTIVE;
  payload: ITrack;
}

interface SetDurationAction {
  type: PlayerActionTypes.SET_DURATION;
  payload: number;
}

interface SetVolumeAction {
  type: PlayerActionTypes.SET_VOLUME;
  payload: number;
}

interface SetCurrentTimeAction {
  type: PlayerActionTypes.SET_CURRENT_TIME;
  payload: number;
}

interface SetDefaultDataAction {
  type: PlayerActionTypes.SET_DEFAULT_DATA;
}

export type PlayerAction =
  IHydrate
  | PlayAction
  | PauseAction
  | SetActiveAction
  | SetDurationAction
  | SetVolumeAction
  | SetCurrentTimeAction
  | SetDefaultDataAction;
