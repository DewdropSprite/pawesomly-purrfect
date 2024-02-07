import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";

function UpdateMedicalForm() {
  let history = useHistory();
  let dispatch = useDispatch();
  let catMedical = useSelector((store) => store.catMedical);

  return (
    <div>
      <h2>Edit Information </h2>
      <ul>
      <input type="text" placeholder="Name" />
      </ul> <ul>
      <input type="text" placeholder="Birthdate" />
      </ul><ul>
      <input type="text" placeholder="Microchip Information" />
      </ul><ul>
      <input type="text" placeholder="Rabies Vaccine Date" />
      </ul><ul>
      <input type="text" placeholder="Distemper Vaccine Date" />
      </ul><ul>
      <input type="text" placeholder="Last Annual Checkup" />
      </ul><ul>
      <input type="text" placeholder="Spayed or Neutered" />
      </ul><ul>
      <button>Save</button>
      </ul>
    </div>
  );
}

export default UpdateMedicalForm;
