import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

function CatProfile(props) {
  let history = useHistory();
  let dispatch = useDispatch();
  const catProfile = useSelector((store) => store.catProfile);
  const { catId } = useParams();

  useEffect(() => {
    dispatch({ type: "FETCH_CAT_PROFILE" });
  }, []);

  //! catId is console.logging as a number in the console.. this code converts it to make it the same type as pet_id in the database
  const cat = catProfile.find((cat) => cat.pet_info_id === Number(catId));

  console.log("cat", cat);

  const handleEdit = () => {
    console.log("handle edit click for:", catId)
    dispatch({ type: 'SET_EDIT_CAT', payload: cat})
    history.push(`/editprofile/${catId}`);
  };

  if (!cat) {
    return <div>Loading....</div>;
  }

  console.log("catProfile reducer", catProfile);
  console.log("catId:", catId);

  function handleDelete(event) {
    event.preventDefault();

    console.log("delete cat id:", catId);

    axios({
      method: 'DELETE',
      url: `/api/cat/${catId}`
    })
      .then(function (response) {
        console.log("Deleted", catId);
        dispatch({type: 'REMOVE_CAT_PROFILE', catId })
        history.push(`/catlist`);

      })
      .catch(function (error) {
        alert("error", error);
      });
  }

  return (
    <div>
      <h4>{cat.name}'s information:</h4>

      <p>Birthdate: {cat.birthdate}</p>
      <p>Microchip: {cat.microchip_id}</p>
      <p>Last Checkup: {cat.annual_checkup}</p>
      <p>Rabies: {cat.rabies}</p>
      <p>Distemper: {cat.distemper} </p>
      <p>Spayed or Neutered? {cat.spay_neuter}</p>
      <button onClick={handleEdit}>Edit {cat.name}'s Information</button>
      <button onClick={handleDelete}>Delete {cat.name}'s Profile </button>
    </div>
  );
}

export default CatProfile;
