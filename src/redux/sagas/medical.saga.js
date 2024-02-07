import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_CAT_PROFILE" actions
function* fetchMedical() {
  try {
  //get the cats:
  const medicalResponse = yield axios.get('/api/medical')
    yield put({ type: 'SET_MEDICAL', payload: medicalResponse.data });
  } catch (error) {
    console.log('cat get request failed', error);
  }
}

function* medicalSaga() {
  yield takeLatest('FETCH_MEDICAL', fetchMedical);
}

export default medicalSaga;