import axios from 'axios';
import { Dispatch } from 'redux';

import { TrackAction, TrackActionTypes } from '../../types/track';

const apiHost = process.env.NEXT_PUBLIC_API_URL;

export const fetchTracks = () => async (dispatch: Dispatch<TrackAction>) => {
  try {
    const response = await axios.get(`${apiHost}/tracks`);
    dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: response.data });
  } catch (e) {
    dispatch({
      type: TrackActionTypes.FETCH_TRACKS_ERROR,
      payload: 'An error occurred while downloading tracks!',
    });
  }
};

export const searchTracks = (query: string) => async (dispatch: Dispatch<TrackAction>) => {
  try {
    const response = await axios.get(`${apiHost}/tracks/search?query=${query}`);
    dispatch({ type: TrackActionTypes.FETCH_TRACKS, payload: response.data });
  } catch (e) {
    dispatch({
      type: TrackActionTypes.FETCH_TRACKS_ERROR,
      payload: 'An error occurred while downloading tracks!',
    });
  }
};

export const removeTrack = (id: string) => async (dispatch: Dispatch<TrackAction>) => {
  try {
    await axios.delete(`${apiHost}/tracks/${id}`);
    dispatch({ type: TrackActionTypes.REMOVE_TRACK, payload: id });
  } catch (e) {
    dispatch({
      type: TrackActionTypes.FETCH_TRACKS_ERROR,
      payload: 'An error occurred while removing track!',
    });
  }
};
