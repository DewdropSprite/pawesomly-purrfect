import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import catProfile from './cat.reducer';
import catMedical from './medical.reducer';
import addCat from './addcat.reducer';

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  catProfile, //will have data for the users cat
  catMedical,
  addCat,
});

export default rootReducer;
