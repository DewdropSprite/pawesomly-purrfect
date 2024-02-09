import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";



const CatForm = () => {
  const dispatch = useDispatch('');

  let [newCat, setCat] = useState('');

  const handleChange = (event) => {
    const {name, value} = event.target;
    setCat({...newCat,
    [name]: value})

  
  }

  const addNewCat = event => {
    event.preventDefault();
    dispatch({type: 'SUBMIT_CAT_PROFILE', payload: newCat});
    setCat('');
  }
  
return(
  <div>
    <h3> Create your cat's profile </h3>
    <form onSubmit={addNewCat}>
      <input type="text" name="name" placeholder="Name" value={newCat.name} onChange={handleChange}/>
      <input type="text" name="birthday" placeholder="Birthday" value={newCat.pet_birthdate} onChange={handleChange}/>
      <input type="text" name="microchip" placeholder="Microchip Info" value={newCat.pet_microchip} onChange={handleChange}/>
      <input type="text" name="annual checkup" placeholder="Last Checkup" value={newCat.annual_checkup} onChange={handleChange}/>
      <input type="text" name="distemper" placeholder="Distemper" value={newCat.distemper} onChange={handleChange}/>
      <input type="text" name="rabies" placeholder="Rabies" value={newCat.rabies} onChange={handleChange}/>
      <input type="text" name="spay or neuter" placeholder="Spay or Neutered" value={newCat.spay_neuter} onChange={handleChange}/>
      <input type="text" name="url" placeholder="Photo URL" value={newCat.photo_url} onChange={handleChange}/>
      {/* <input type="text" placeholder="Owner ID" value={newCat.owner_id} onChange={handleChange}/>
      <input type="text" placeholder="Pet ID" value={newCat.pet_id} onChange={handleChange}/> */}
            <button type="submit" value="submit">Save</button>
    </form>
  </div>
)

}



export default CatForm;
