import { AnyAction, applyMiddleware, createStore, Dispatch } from 'redux';
import { Context, createWrapper, MakeStore } from 'next-redux-wrapper';
import { reducer, RootState } from './reducers/index';

// Middlewares
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import thunk, { ThunkDispatch, ThunkAction } from 'redux-thunk';
// import createSagaMiddleware from 'redux-saga';

const middlewaresArr = [thunk];
process.env.NODE_ENV === 'development' && middlewaresArr.push(logger);

const middlewares = applyMiddleware(...middlewaresArr);

// create a makeStore function
const makeStore: MakeStore<RootState> = (context: Context) =>
  createStore(reducer, composeWithDevTools(middlewares));

// export an assembled wrapper
export const wrapper = createWrapper<RootState>(makeStore, { debug: true });

export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>;
