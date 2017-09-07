import todoSaga from './todoSaga';

function* rootSaga() {
  /* The saga is waiting for a action called FETCH_PATIENTS to be activated */
  yield [
    todoSaga()
  ];
}

export default rootSaga;
