import {createStore, applyMiddleware} from "redux";
import {rootReducer as Reducer} from './reducer';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootSaga from "./saga";

function configureStore(initialState = {}) {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(Reducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);

  const newReducer = require('./reducer').rootReducer; // eslint-disable-line
  store.replaceReducer(newReducer);

  return store;
}

const store = configureStore();

export {store}
