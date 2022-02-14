import { AnyAction, applyMiddleware, createStore, Dispatch, Middleware, Store } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkDispatch } from 'redux-thunk';
import logger from 'redux-logger';
import { rootReducer, RootState } from './reducers';

const middlewaresArr:  Middleware<{}, any, Dispatch<AnyAction>>[] = [thunk];

if (process.env.NODE_ENV === 'development') {
  middlewaresArr.push(logger);
}

const middlewares = applyMiddleware(...middlewaresArr);

const makeStore = () => {
  return process.env.NODE_ENV === 'development'
    ? createStore(rootReducer, composeWithDevTools(middlewares))
    : createStore(rootReducer, middlewares);
};

export const wrapper = createWrapper<Store<RootState, AnyAction>>(makeStore, { debug: true });

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;
