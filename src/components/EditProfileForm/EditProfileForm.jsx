import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

function EditProfileForm() {
  let history = useHistory();
  let dispatch = useDispatch();
  
  let editCat = useSelector((store) => store.editCat);
  
  let { catId } = useParams();

  function handleNameChange(event) {
    event.preventDefault();
      dispatch
        ({type: "EDIT_ONCHANGE",
        payload: { property: "name", value: event.target.value }
    })}
    function handleNameSubmit(event) {
      console.log("editcat", editCat)
      event.preventDefault();
      axios
        .put(`/api/cat/name/${catId}`, editCat)
        .then((response) => {
          dispatch({ type: "EDIT_CLEAR" });
          history.push(`/catprofile/${catId}`);
        })
        .catch((error) => {
          console.log("error", error);
        });
    }

    function handleBirthdateChange(event) {
      event.preventDefault();
        dispatch
          ({type: "EDIT_ONCHANGE",
          payload: { property: "birthdate", value: event.target.value }
      })}
      function handleBirthdateSubmit(event) {
        console.log("editcat", editCat)
        event.preventDefault();
        axios
          .put(`/api/cat/birthdate/${catId}`, editCat)
          .then((response) => {
            dispatch({ type: "EDIT_CLEAR" });
            history.push(`/catprofile/${catId}`);
          })
          .catch((error) => {
            console.log("error", error);
          });
      }


      function handleMicrochipChange(event) {
        event.preventDefault();
          dispatch
            ({type: "EDIT_ONCHANGE",
            payload: { property: "microchip_id", value: event.target.value }
        })}
        function handleMicrochipSubmit(event) {
          console.log("editcat", editCat)
          event.preventDefault();
          axios
            .put(`/api/cat/microchip/${catId}`, editCat)
            .then((response) => {
              dispatch({ type: "EDIT_CLEAR" });
              history.push(`/catprofile/${catId}`);
            })
            .catch((error) => {
              console.log("error", error);
            });
        }

        function handleDistemperChange(event) {
          event.preventDefault();
            dispatch
              ({type: "EDIT_ONCHANGE",
              payload: { property: "distemper", value: event.target.value }
          })}
          function handleDistemperSubmit(event) {
            console.log("editcat", editCat)
            event.preventDefault();
            axios
              .put(`/api/cat/distemper/${catId}`, editCat)
              .then((response) => {
                dispatch({ type: "EDIT_CLEAR" });
                history.push(`/catprofile/${catId}`);
              })
              .catch((error) => {
                console.log("error", error);
              });
          }

          function handleRabiesChange(event) {
            event.preventDefault();
              dispatch
                ({type: "EDIT_ONCHANGE",
                payload: { property: "rabies", value: event.target.value }
            })}
            function handleRabiesSubmit(event) {
              console.log("editcat", editCat)
              event.preventDefault();
              axios
                .put(`/api/cat/rabies/${catId}`, editCat)
                .then((response) => {
                  dispatch({ type: "EDIT_CLEAR" });
                  history.push(`/catprofile/${catId}`);
                })
                .catch((error) => {
                  console.log("error", error);
                });
            }

            function handleCheckupChange(event) {
              event.preventDefault();
                dispatch
                  ({type: "EDIT_ONCHANGE",
                  payload: { property: "annual_checkup", value: event.target.value }
              })}
              function handleCheckupSubmit(event) {
                console.log("editcat", editCat)
                event.preventDefault();
                axios
                  .put(`/api/cat/checkup/${catId}`, editCat)
                  .then((response) => {
                    dispatch({ type: "EDIT_CLEAR" });
                    history.push(`/catprofile/${catId}`);
                  })
                  .catch((error) => {
                    console.log("error", error);
                  });
              }

              function handleSpayNeuterChange(event) {
                event.preventDefault();
                  dispatch
                    ({type: "EDIT_ONCHANGE",
                    payload: { property: "spayneuter", value: event.target.value }
                })}
                function handleSpayNeuterSubmit(event) {
                  console.log("editcat", editCat)
                  event.preventDefault();
                  axios
                    .put(`/api/cat/spayneuter/${catId}`, editCat)
                    .then((response) => {
                      dispatch({ type: "EDIT_CLEAR" });
                      history.push(`/catprofile/${catId}`);
                    })
                    .catch((error) => {
                      console.log("error", error);
                    });
                }



  return (
    <div>
      <h2>Would you like to change {editCat.name}'s name? </h2>
      <form>
        <input
          name="name"
          onChange={handleNameChange}
          value={editCat.name}
          type="text"
          placeholder="Name"
        />
        <button onClick={handleNameSubmit}>Save</button>
      </form>
      <div>
        <h2>
          Would you like to make a change to {editCat.name}'s medical history?
        </h2>
      </div>

      <form>
        <h6>Birthdate</h6>
        <input
          birthdate="birthdate"
          onChange={handleBirthdateChange}
          value={editCat.birthdate}
          type="text"
          placeholder="Birthdate"
        />
        <button onClick={handleBirthdateSubmit}>Save</button>

        <h6>Microchip ID:</h6>
        <input
          microchip="microchip_id"
          onChange={handleMicrochipChange}
          value={editCat.microchip_id}
          type="text"
          placeholder="Microchip Information"
        />
        <button onClick={handleMicrochipSubmit}>Save</button>

        <h6>Rabies Vaccine</h6>
        <input
          rabies="rabies"
          onChange={handleRabiesChange}
          value={editCat.rabies}
          type="text"
          placeholder="Rabies Vaccine Date"
        />
        <button onClick={handleRabiesSubmit}>Save</button>

        <h6>Distemper Vaccine </h6>
        <input
          distemper="distemper"
          onChange={handleDistemperChange}
          value={editCat.distemper}
          type="text"
          placeholder="Distemper Vaccine Date"
        />
        <button onClick={handleDistemperSubmit}>Save</button>

        <h6>Last Checkup</h6>
        <input
          checkup="annual_checkup"
          onChange={handleCheckupChange}
          value={editCat.annual_checkup}
          placeholder="Last Annual Checkup"
        />
        <button onClick={handleCheckupSubmit}>Save</button>

        <h6>Spayed or Neutered? </h6>
        <input
          spayneuter="spay_neuter"
          onChange={handleSpayNeuterChange}
          value={editCat.spay_neuter}
          type="text"
          placeholder="Spayed or Neutered"
        />
        <button onClick={handleSpayNeuterSubmit}>Save</button>
      </form>
    </div>
  );
}

export default EditProfileForm;
