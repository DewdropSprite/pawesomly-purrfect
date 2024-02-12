import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

function EditProfileForm(props) {
  let history = useHistory();
  let dispatch = useDispatch();
  let editCat = useSelector((store) => store.editCat);
  let { catId } = useParams();


  function handleSubmit(event) {
    event.preventDefault();
    axios
      .put(`/api/cat/${catId}`, catId)
      .then((response) => {
        dispatch({ type: "EDIT_CLEAR" });
        history.push("/catlist");
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    dispatch({
      type: "EDIT_ONCHANGE",
      payload: { property: name, value: value },
    });
  }

  return (
    <div>
      <h2>Would you like to change {editCat.name}'s name? </h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          onChange={handleChange}
          value={editCat.name}
          type="text"
          placeholder="Name"
        />
        <button type="submit">Save</button>
      </form>
      <div>
        <h2>
          Would you like to make a change to {editCat.name}'s medical history?
        </h2>
      </div>

      <form>
        <h6>Birthdate</h6>
        <input
          name="birthdate"
          onChange={handleChange}
          value={editCat.birthdate}
          type="text"
          placeholder="Birthdate"
        />
        <button type="submit">Save</button>

        <h6>Microchip ID:</h6>
        <input
          name="microchip_id"
          onChange={handleChange}
          value={editCat.microchip_id}
          type="text"
          placeholder="Microchip Information"
        />
        <button type="submit">Save</button>

        <h6>Rabies Vaccine</h6>
        <input
          name="rabies"
          onChange={handleChange}
          value={editCat.rabies}
          type="text"
          placeholder="Rabies Vaccine Date"
        />
        <button type="submit">Save</button>

        <h6>Distemper Vaccine </h6>
        <input
          name="distemper"
          onChange={handleChange}
          value={editCat.distemper}
          type="text"
          placeholder="Distemper Vaccine Date"
        />
        <button type="submit">Save</button>

        <h6>Last Checkup</h6>
        <input
          name="annual_checkup"
          onChange={handleChange}
          value={editCat.annual_checkup}
          placeholder="Last Annual Checkup"
        />
        <button type="submit">Save</button>

        <h6>Spayed or Neutered? </h6>
        <input
          name="spay_neuter"
          onChange={handleChange}
          value={editCat.spay_neuter}
          type="text"
          placeholder="Spayed or Neutered"
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditProfileForm;
