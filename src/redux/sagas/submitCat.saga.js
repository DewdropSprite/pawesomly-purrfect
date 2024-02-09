function* submitCat(action){
    try{
        const response = yield axios.post('/api/cat', action.payload);
        yield put({type: 'SET_CAT', payload: response.data});
    }
    catch (error) {
        console.log("error submitting cat profile:", error)
    }
}

function* submitCatProfile(){
    yield takeLatest('SUBMIT_CAT_PROFILE', submitCat)
}