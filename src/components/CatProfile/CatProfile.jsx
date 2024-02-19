CatProfile;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { DateTime } from "luxon";
import swal from "sweetalert";

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
    console.log("handle edit click for:", catId);
    dispatch({ type: "SET_EDIT_CAT", payload: cat });
    history.push(`/editprofile/${catId}`);
  };

  if (!cat) {
    return <div>Loading....</div>;
  }

  console.log("catProfile reducer", catProfile);
  console.log("catId:", catId);


const handleDelete = async (event, catId) => {
  event.preventDefault();
  console.log("delete cat id:", catId);
  
  try {
    const value = await swal({
      title: "Are you sure?",
      text: "Select your action for this cat profile",
      icon: "warning",
      buttons: {
        cancel: "Go Back",
        delete: {
          text: "Permanently Delete",
          value: "delete",
        },
        //! future iteratioin for a cat to be moved to a "virtual cemetary" instead of permanently deleting them. 
        // moveToCemetery: {
        //   text: "Move to Virtual Cemetery",
        //   value: "moveToCemetery",
        // },
      },
      dangerMode: true,
    });

    if (value === "delete") {
      history.push('/');
      await axios.delete(`/api/cat/${catId}`);
      console.log("Deleted", catId);
      await swal("Deleted!", "The cat profile has been permanently deleted.", "success");
      dispatch({ type: "REMOVE_CAT_PROFILE", catId }); 
      
      //! virtual cemetary code.. future iteration
    // } else if (value === "moveToCemetery") {
    //   await axios.post(`/api/cat/${catId}/cemetary`);
    //   console.log("Moved to virtual cemetery", catId);
    //   await swal("Moved!", "The cat profile has been moved to the virtual cemetery.", "success");
    //   dispatch({ type: "REMOVE_CAT_PROFILE", catId }); 
    //   history.push('/virtualcemetary'); 
    } else {
      // The user clicked on "Go Back" or clicked outside the alert, no action needed
      swal("Cancelled", "No changes were made to the cat profile.", "info");
    }
  } catch (error) {
    console.error("An error occurred while processing the profile:", error);
    swal("Error", "An error occurred while processing the profile.", "error");
  }
};


  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Cat's Name</TableCell>
              <TableCell align="right">Birthdate</TableCell>
              <TableCell align="right">Microchip Information</TableCell>
              <TableCell align="right">Last Checkup</TableCell>
              <TableCell align="right">Last Rabies Vaccine</TableCell>
              <TableCell align="right">Last Distemper Vaccine</TableCell>
              <TableCell align="right">Spayed or Neutered?</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              key={cat.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="cat">
                {cat.name}
              </TableCell>
              <TableCell align="right">
                {cat.birthdate &&
                  DateTime.fromISO(cat.birthdate).toFormat("LL/ dd/ yyyy")}
              </TableCell>
              <TableCell align="right">{cat.microchip_id}</TableCell>
              <TableCell align="right">
                {cat.annual_checkup &&
                  DateTime.fromISO(cat.annual_checkup).toFormat("LL/ dd/ yyyy")}
              </TableCell>
              <TableCell align="right">
                {cat.rabies &&
                  DateTime.fromISO(cat.rabies).toFormat("LL/ dd/ yyyy")}
              </TableCell>
              <TableCell align="right">
                {cat.distemper &&
                  DateTime.fromISO(cat.distemper).toFormat("LL/ dd/ yyyy")}
              </TableCell>
              <TableCell align="right">{cat.spay_neuter}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <button onClick={handleEdit}>Edit {cat.name}'s Information</button>
        <button onClick={(event)=> handleDelete(event, cat.id)}>Delete {cat.name}'s Profile </button>
      </div>
    </div>
  );
}


export default CatProfile;
