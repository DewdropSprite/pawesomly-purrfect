import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

function CatMedical() {
  let history = useHistory();
  let dispatch = useDispatch();
  const catMedical = useSelector((store) => store.catMedical);
  const { catId } = useParams();

  useEffect(() => {
    dispatch({ type: "FETCH_MEDICAL" });
  }, []);
//! catId is console.logging as a number in the console.. this code converts it to make it the same type as pet_id in the database
  const cat = catMedical.find((cat) => cat.pet_id === Number(catId));

  console.log("cat",cat)
  const handleClick = (catId) => {
    history.push(`/updatemedical/${catId}`);
  };

  if (!cat) {
    return <div>Loading....</div>;
  }

  console.log("catMedical reducer", catMedical);
  console.log("catId:", catId)

  return (
    <div>
      <h4>{cat.pet_name}'s information:</h4>

      <p>Birthdate: {cat.pet_birthdate}</p>
      <p>Microchip: {cat.pet_microchip}</p>
      <p>Last Checkup: {cat.annual_checkup}</p>
      <p>Rabies: {cat.rabies}</p>
      <p>Distemper: {cat.distemper} </p>
      <p>Spayed or Neutered? {cat.spay_neuter}</p>
      <button onClick={handleClick}>
        Edit {cat.pet_name}'s Information
      </button>
    </div>
  );

}

export default CatMedical;
