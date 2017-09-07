
import { createStore, applyMiddleware } from 'redux'
import rootSaga from '../saga/index';
import createSagaMiddleware, { END } from 'redux-saga';
import { logger } from '../middleware'
import rootReducer from '../reducers'
const sagaMiddleware = createSagaMiddleware();
export default function cs(initialState) {
  const create = window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore

  const createStoreWithMiddleware = applyMiddleware(
    sagaMiddleware,
    logger
  )(create)
  
  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }
  const store = createStoreWithMiddleware(rootReducer, initialState)
  sagaMiddleware.run(rootSaga);
  store.close = () => store.dispatch(END);
  return store
}
