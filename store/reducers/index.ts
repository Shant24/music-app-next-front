import { combineReducers } from 'redux';

import { playerReducer } from './playerReducer';
import { tractReducer } from './trackReducer';

export const rootReducer = combineReducers({
  player: playerReducer,
  track: tractReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
