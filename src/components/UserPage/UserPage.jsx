import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import CatList from '../CatList/CatList';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
<h2>Welcome, {user.firstname}!</h2>  
      {/* <p>Your ID is: {user.id}</p> */
      /* /* <LogOutButton className="btn" /> */}
      <CatList />
    </div>
    
  );
 
}

// this allows us to use <App /> in index.js
export default UserPage;
