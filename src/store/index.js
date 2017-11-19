
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import rootSaga from '../saga/index';
// import { logger } from '../middleware'
import rootReducer from '../reducers';
const sagaMiddleware = createSagaMiddleware();
export default function cs(initialState) {
  const create = window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore;

  const createStoreWithMiddleware = applyMiddleware(
    sagaMiddleware
    // logger
  )(create);
  const store = createStoreWithMiddleware(rootReducer, initialState);
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }
  sagaMiddleware.run(rootSaga);
  store.close = () => store.dispatch(END);
  return store;
}
