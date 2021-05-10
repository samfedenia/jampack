import { createStore, applyMiddleware } from 'redux';
import thunks from 'redux-thunk';
import loggingMiddleware from 'redux-logger';
import combineReducers from './reducers';

const store = createStore(
  combineReducers,
  applyMiddleware(thunks, loggingMiddleware)
);

export default store;
