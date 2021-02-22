import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

import { RootState } from './../reducers/index';
import { TrackAction, TrackActionTypes } from '../../types/track';

const apiHost = process.env.API_HOST;

export const fetchTracks: ActionCreator<
  ThunkAction<Action, RootState, void>
> = () => async (dispatch: Dispatch<TrackAction>): Action => {
  try {
    const response = await axios.get(`${apiHost}/tracks`);
    dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: response.data });
  } catch (e) {
    dispatch({
      type: TrackActionTypes.FETCH_TRACKS_ERROR,
      payload: 'An error occurred while downloading tracks!'
    });
  }
};

export const searchTracks: ActionCreator<
  ThunkAction<Action, RootState, void>
> = (query: string) => async (dispatch: Dispatch<TrackAction>): Action => {
  try {
    const response = await axios.get(`${apiHost}/tracks/search?query=${query}`);
    dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: response.data });
  } catch (e) {
    dispatch({
      type: TrackActionTypes.FETCH_TRACKS_ERROR,
      payload: 'An error occurred while downloading tracks!'
    });
  }
};
