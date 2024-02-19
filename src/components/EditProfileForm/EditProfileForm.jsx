import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { DateTime } from 'luxon';
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
                    <form>
                      <h2>Edit {editCat.name}'s Profile </h2>
                      <table>
                        <tbody>
                          <tr>
                            <th>Name:</th>
                            <td>{editCat.name}</td>
                            <td>
                              <input
                                name="name"
                                onChange={handleNameChange}
                                value={editCat.name}
                                type="text"
                                placeholder="New Name"
                              />
                            </td>
                            <td>
                              <button onClick={handleNameSubmit}>Save</button>
                            </td>
                          </tr>
                          <tr>
                            <th>Birthdate:</th>
                            <td>{editCat.birthdate && DateTime.fromISO(editCat.birthdate).toFormat('LL/ dd/ yyyy')}</td>
                            <td>
                              <input
                                name="birthdate"
                                onChange={handleBirthdateChange}
                                value={editCat.birthdate}
                                type="date"
                              />
                            </td>
                            <td>
                              <button onClick={handleBirthdateSubmit}>Save</button>
                            </td>
                          </tr>
                          <tr>
                            <th>Microchip ID:</th>
                            <td>{editCat.microchip_id}</td>
                            <td>
                              <input
                                name="microchip_id"
                                onChange={handleMicrochipChange}
                                value={editCat.microchip_id}
                                type="text"
                                placeholder="New Microchip ID"
                              />
                            </td>
                            <td>
                              <button onClick={handleMicrochipSubmit}>Save</button>
                            </td>
                          </tr>
                          <tr>
                            <th>Rabies Vaccine:</th>
                            <td>{editCat.rabies && DateTime.fromISO(editCat.rabies).toFormat('LL/ dd/ yyyy')}</td>
                            <td>
                              <input
                                name="rabies"
                                onChange={handleRabiesChange}
                                value={editCat.rabies}
                                type="date"
                                placeholder="New Rabies Vaccine Date"
                              />
                            </td>
                            <td>
                              <button onClick={handleRabiesSubmit}>Save</button>
                            </td>
                          </tr>
                          <tr>
                            <th>Distemper Vaccine:</th>
                            <td>{editCat.distemper && DateTime.fromISO(editCat.distemper).toFormat('LL/ dd/ yyyy')}</td>
                            <td>
                              <input
                                name="distemper"
                                onChange={handleDistemperChange}
                                value={editCat.distemper}
                                type="date"
                                placeholder="New Distemper Vaccine Date"
                              />
                            </td>
                            <td>
                              <button onClick={handleDistemperSubmit}>Save</button>
                            </td>
                          </tr>
                          <tr>
                            <th>Last Checkup:</th>
                            <td>{editCat.annual_checkup && DateTime.fromISO(editCat.annual_checkup).toFormat('LL/ dd/ yyyy')}</td>
                            <td>
                              <input
                                name="annual_checkup"
                                onChange={handleCheckupChange}
                                value={editCat.annual_checkup}
                                type="date"
                                placeholder="New Checkup Date"
                              />
                            </td>
                            <td>
                              <button onClick={handleCheckupSubmit}>Save</button>
                            </td>
                          </tr>
                          <tr>
                            <th>Spayed or Neutered?:</th>
                            <td>{editCat.spay_neuter}</td>
                            <td>
                              <input
                                name="spay_neuter"
                                onChange={handleSpayNeuterChange}
                                value={editCat.spay_neuter}
                                type="text"
                                placeholder="Update Status"
                              />
                            </td>
                            <td>
                              <button onClick={handleSpayNeuterSubmit}>Save</button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </form>
                  </div>
                );
                
    
}

export default EditProfileForm;
