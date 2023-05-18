import { combineReducers } from 'redux';
import { tractReducer } from './trackReducer';

export const rootReducer = combineReducers({
  track: tractReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
