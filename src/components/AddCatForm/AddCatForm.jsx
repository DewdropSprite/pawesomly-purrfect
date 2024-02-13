import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// import axios from "axios";

const AddCatForm = () => {
  let dispatch = useDispatch("");
  let history = useHistory("");

  const [open, setOpen] = React.useState(false);

  let [newCat, setCat] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCat({ ...newCat, [name]: value });
  };

  const addNewCat = (event) => {
    event.preventDefault();
    setOpen(true);
    dispatch({ type: "FETCH_ADD_CAT", payload: newCat });

    
  };

  const handleClose=(reason) => {
    if (reason === 'clickaway'){
      return;
    }
    setOpen(false);
    history.push("/catlist");
  }

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
       Close
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );


  return (
    <div>
      <h3> Create your cat's profile </h3>
      
      <form onSubmit={addNewCat}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newCat.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="birthdate"
          placeholder="Birthday"
          value={newCat.birthdate}
          onChange={handleChange}
        />
        <input
          type="text"
          name="microchip_id"
          placeholder="Microchip Info"
          value={newCat.microchip_id}
          onChange={handleChange}
        />
        <input
          type="text"
          name="annual_checkup"
          placeholder="Last Checkup"
          value={newCat.annual_checkup}
          onChange={handleChange}
        />
        <input
          type="text"
          name="distemper"
          placeholder="Distemper"
          value={newCat.distemper}
          onChange={handleChange}
        />
        <input
          type="text"
          name="rabies"
          placeholder="Rabies"
          value={newCat.rabies}
          onChange={handleChange}
        />
        <input
          type="text"
          name="spay_neuter"
          placeholder="Spay or Neutered"
          value={newCat.spay_neuter}
          onChange={handleChange}
        />
        <input
          type="text"
          name="photo_url"
          placeholder="Photo URL"
          value={newCat.photo_url}
          onChange={handleChange}
        />
      <Button onClick={addNewCat}>Add Profile</Button>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Profile Added Successfully"
        action={action}
      />
      </form>
    </div>
  );
};

export default AddCatForm;
