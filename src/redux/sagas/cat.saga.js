import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_CAT_PROFILE" actions
function* fetchCat() {
  try {
  //get the cats:
  const catResponse = yield axios.get('/api/cat')
    yield put({ type: 'SET_CAT_PROFILE', payload: catResponse.data });
  } catch (error) {
    console.log('cat get request failed', error);
  }
}


function* catSaga() {
  yield takeLatest('FETCH_CAT_PROFILE', fetchCat);
}

export default catSaga;
