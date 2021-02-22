import axios from 'axios';

import { TrackAction, TrackActionTypes } from '../../types/track';

const apiHost = process.env.API_HOST;

export const fetchTracks = () => async (dispatch: Dispatch<TrackAction>) => {
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

export const searchTracks = (query: string) => async (
  dispatch: Dispatch<TrackAction>
) => {
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
