import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";



const AddCatForm = () => {
  let dispatch = useDispatch('');
  let history = useHistory('');

  // const addCat = useSelector((store) => store.addCat)

  

  let [newCat, setCat] = useState('');

  const handleChange = (event) => {
    const {name, value} = event.target;
    setCat({...newCat,
    [name]: value})

  
  }

  const addNewCat = event => {
    event.preventDefault();
    // const payload = {name: newCat}
    dispatch({type: 'ADD_CAT', payload: newCat});
    setCat('');
    history.push('/catlist')
  }

return(
  <div>
    <h3> Create your cat's profile </h3>
    <form onSubmit={addNewCat}>
      <input type="text" name="name" placeholder="Name" value={newCat.name} onChange={handleChange}/>
      <input type="text" name="birthdate" placeholder="Birthday" value={newCat.birthdate} onChange={handleChange}/>
      <input type="text" name="microchip_id" placeholder="Microchip Info" value={newCat.microchip_id} onChange={handleChange}/>
      <input type="text" name="annual_checkup" placeholder="Last Checkup" value={newCat.annual_checkup} onChange={handleChange}/>
      <input type="text" name="distemper" placeholder="Distemper" value={newCat.distemper} onChange={handleChange}/>
      <input type="text" name="rabies" placeholder="Rabies" value={newCat.rabies} onChange={handleChange}/>
      <input type="text" name="spay_neuter" placeholder="Spay or Neutered" value={newCat.spay_neuter} onChange={handleChange}/>
      <input type="text" name="photo_url" placeholder="Photo URL" value={newCat.photo_url} onChange={handleChange}/>
    <button type="submit" value="submit">Save</button>
    </form>
  </div>
)

}



export default AddCatForm;
