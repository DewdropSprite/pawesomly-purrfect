import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "REMOVE_CAT_PROFILE" actions
function* removeCat(action) {
    try {
    //get the cats:
    yield call(axios.delete(`/api/cat/${action.catId}`))
      yield put({ type: 'SET_CAT_PROFILE'});
    } catch (error) {
      console.log('cat get request failed', error);
    }
  }

function* removeCatSaga(){
    yield takeLatest('REMOVE_CAT_PROFILE', removeCat)
  }

export default removeCatSaga;
