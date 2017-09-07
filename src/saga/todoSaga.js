import { call, takeLatest, cancelled, put, select } from 'redux-saga/effects';
import * as Actions from '../actions/todos';
import * as ActionCreators from '../actions/todoActionCreator';
import * as Api from '../services/apiCalls'
function* addTodo(action) {
  try {
    console.log('inside saga')
    const {params} = action;
    yield select();
    const patientDetails = (yield call(Api.getTodo, params )).data;
    yield put(ActionCreators.addTodoSucces(patientDetails));
  } catch (e) {
    console.error(e, 'catch block of watchPatientFetch');
  } finally {
    // If the saga is cancelled, the API cancel the API request
    if (yield cancelled()) {
      // Cancel the request if the saga is cancelleds
    }
  }
}
export default function* patientHeaderSaga() {
  yield [
    // Only the latest is taken, all others would be ignored/cancelled
    takeLatest(Actions.ADD_TODO, addTodo)
  ];
}
