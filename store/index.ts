import { AnyAction, applyMiddleware, createStore } from 'redux';
import { createWrapper, MakeStore } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkDispatch } from 'redux-thunk';
import logger from 'redux-logger';
import { reducer, RootState } from './reducers';

const middlewaresArr = [thunk];
process.env.NODE_ENV === 'development' && middlewaresArr.push(logger);

const middlewares = applyMiddleware(...middlewaresArr);

const makeStore: MakeStore<RootState> = () => {
  return process.env.NODE_ENV === 'development'
    ? createStore(reducer, composeWithDevTools(middlewares))
    : createStore(reducer, middlewares);
};

export const wrapper = createWrapper<RootState>(makeStore, { debug: true });

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;
