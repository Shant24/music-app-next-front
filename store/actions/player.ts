import { Action, ActionCreator } from 'redux';
import { PlayerAction, PlayerActionTypes } from './../../types/player';
import { ITrack } from './../../types/track';

export const playTrack: ActionCreator<Action> = (): PlayerAction => ({
  type: PlayerActionTypes.PLAY
});

export const pauseTrack: ActionCreator<Action> = (): PlayerAction => ({
  type: PlayerActionTypes.PAUSE
});

export const setDuration: ActionCreator<Action> = (
  payload: number
): PlayerAction => ({
  type: PlayerActionTypes.SET_DURATION,
  payload
});

export const setVolume: ActionCreator<Action> = (
  payload: number
): PlayerAction => ({
  type: PlayerActionTypes.SET_VOLUME,
  payload
});

export const setCurrentTime: ActionCreator<Action> = (
  payload: number
): PlayerAction => ({
  type: PlayerActionTypes.SET_CURRENT_TIME,
  payload
});

export const setActiveTrack: ActionCreator<Action> = (
  payload: ITrack
): PlayerAction => ({
  type: PlayerActionTypes.SET_ACTIVE,
  payload
});
