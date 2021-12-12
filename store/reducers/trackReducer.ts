import { TrackAction, TrackActionTypes, TrackState } from '../../types/track';
import { HYDRATE } from 'next-redux-wrapper';

const initialState: TrackState = {
  tracks: [],
  error: '',
};

export const tractReducer = (state = initialState, action: TrackAction): TrackState => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload.track,
      };

    case TrackActionTypes.FETCH_TRACKS:
      return { error: '', tracks: action.payload };

    case TrackActionTypes.FETCH_TRACKS_ERROR:
      return { ...state, error: action.payload };

    case TrackActionTypes.REMOVE_TRACK:
      const newTracks = state.tracks.filter((track) => track._id !== action.payload);
      return { ...state, tracks: newTracks };

    default:
      return state;
  }
};
