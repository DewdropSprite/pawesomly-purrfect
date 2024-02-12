import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_ADD_CAT" actions
function* addCatProfileSaga(action) {
  try {
  //add the cats:
  const catProfile = yield axios.post('/api/cat', action.payload)
    yield put({ type: 'ADD_CAT', payload: catProfile.data });
  } catch (error) {
    console.log('add cat get request failed', error);
  }
}

function* addCatSaga() {
  yield takeLatest('FETCH_ADD_CAT', addCatProfileSaga);
}
export default addCatSaga;
