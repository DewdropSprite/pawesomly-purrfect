import { combineReducers } from 'redux';
import errors from './errors.reducer';
import userReducer from './user.reducer';
import catProfile from './cat.reducer';
import addCat from './addcat.reducer';
import removeCat from './removecat.reducer';
import editCat from './editcat.reducer';
// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user: userReducer, // will have an id and username if someone is logged in
  catProfile, //will have data for the users cat
  addCat,
  removeCat,
  editCat
});

export default rootReducer;
