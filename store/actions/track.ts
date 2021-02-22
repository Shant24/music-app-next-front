import { AnyAction, Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import axios from 'axios';

import { TrackAction, TrackActionTypes } from '../../types/track';

const apiHost = process.env.API_HOST;

export const fetchTracks: ActionCreator<
  ThunkAction<Promise<Action>, TrackAction, void, AnyAction>
> = () => async (dispatch: Dispatch<TrackAction>): Promise<Action> => {
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
  ThunkAction<Action, RootState, void, AnyAction>
> = (query: string) => async (
  dispatch: Dispatch<TrackAction>
): Promise<Action> => {
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
