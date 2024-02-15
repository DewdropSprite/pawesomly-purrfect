import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import axios from "axios";

const AddCatForm = () => {
  let dispatch = useDispatch("");
  let history = useHistory("");

  const [open, setOpen] = React.useState(false);
  const [shouldRedirect, setShouldRedirect] = useState(false);

  let [newCat, setCat] = useState({
    name: "",
    birthdate: "",
    microchip_id: "",
    annual_checkup: "",
    distemper: "",
    rabies: "",
    spay_neuter: "",
    photo_url: null, // Modify to hold file data
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCat({ ...newCat, [name]: value });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setCat({ ...newCat, photo_url: file });
  };

  const addNewCat = async (event) => {
    event.preventDefault();
    setOpen(true);

    const formData = new FormData();
    Object.entries(newCat).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      await axios.post("/api/cat", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },   
      });
      dispatch({ type: 'ADD_CAT', payload: newCat });
      // setOpen(true); 
      setShouldRedirect(true);
    } catch (error) {
      console.error("Error adding cat:", error);
      setOpen(false);
    }
  };

  useEffect(() => {
    if (!open && shouldRedirect) {
      // Wait for Snackbar to close, then navigate
      history.push("/catlist");
      setShouldRedirect(false); // Reset redirect state
    }
  }, [open, shouldRedirect, history]);

  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    if(open){
      history.push("/catlist")
    }
  };

  const action = (
    <>
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
    </>
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
        <p>Add Profile Picture</p>
        <input
          type="file"
          onChange={handleFileChange}
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
