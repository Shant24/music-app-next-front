import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '../store/reducers';

export interface IHydrate {
  type: typeof HYDRATE;
  payload: RootState;
}
