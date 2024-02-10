import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_CAT_PROFILE" actions
function* fetchCatProfileSaga() {
  try {
  //get the cats:
  const catProfile = yield axios.get('/api/cat')
    yield put({ type: 'ADD_CAT', payload: catProfile.data });
  } catch (error) {
    console.log('add cat get request failed', error);
  }
}

function* addCatSaga() {
  yield takeLatest('FETCH_ADD_CAT', fetchCatProfileSaga);
}
export default addCatSaga;
