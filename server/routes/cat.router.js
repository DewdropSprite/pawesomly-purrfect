const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// router.get("/", (req, res) => {
//   // GET route code here
//   console.log("/cat GET route");
//   console.log("is authenticate?", req.isAuthenticated());
//   console.log("user", req.user);

//   if (req.isAuthenticated()) {
//     // let queryText = `SELECT * FROM pet_info;`
//     let queryText = `
// SELECT "pet_info".*, "pet_photo"."photo_url"
// FROM "pet_info"
// JOIN "pet_info" ON "pet_photo"."pet_info_id" = "pet_info"."id";
//   `;
//     pool
//       .query(queryText)
//       .then((result) => {
//         res.send(result.rows);
//       })
//       .catch((error) => {
//         console.log("error", error);
//         res.sendStatus(500);
//       });
//   } else {
//     res.sendStatus(403);
//   }
// });
router.get("/", async (req, res) => {
  let connection;

  try {
    connection = await pool.connect(); // Get a connection from the pool

    const query = `
      SELECT * FROM pet_info
      JOIN medical_record ON pet_info.medical_record_id = medical_record.id
      JOIN pet_photo ON pet_info.id = pet_photo.pet_info_id;
    `; // Example query, adjust based on your schema

    const result = await connection.query(query);
    const pets = result.rows;

    res.json(pets); // Send the result back to the client
  } catch (error) {
    console.error("Error fetching pets:", error);
    res.sendStatus(500); // Internal Server Error
  } finally {
    if (connection) {
      connection.release(); // Always release the connection
    }
  }
});



router.post("/", async (req, res) => {
  let connection;

  try {
    // const user = req.user.id;

    const {
      birthdate,
      microchip_id,
      distemper,
      rabies,
      annual_checkup,
      spay_neuter,
      name,
      owner_id,
      photo_url,
    } = req.body;

    const medicalRecord = [
      birthdate,
      microchip_id,
      distemper,
      rabies,
      annual_checkup,
      spay_neuter,
    ];
    console.log("medicalRecord", medicalRecord);

    const petInfo = [name, owner_id];
    console.log("petInfo", petInfo);

    const petPhoto = [photo_url];
    console.log("petPhoto", petPhoto);

    connection = await pool.connect();
    connection.query("BEGIN;");

    //! medical record table
    const medicalRecordQuery = `
  INSERT INTO medical_record
  (birthdate, microchip_id, distemper, rabies, annual_checkup, spay_neuter)
  VALUES
  ($1, $2, $3, $4, $5, $6)
  RETURNING id;
  `;

    const medicalRecordRes = await connection.query(
      medicalRecordQuery,
      medicalRecord
    );
    const createMedicalRecordId = medicalRecordRes.rows[0].id;

    //   //! pet info table
    const petInfoQuery = `
  INSERT INTO pet_info
  (name, owner_id, medical_record_id)
  VALUES
  ($1, $2, $3)
  RETURNING id;
  `;

    const petInfoRes = await connection.query(
      petInfoQuery,
      [...petInfo,
      createMedicalRecordId]
    );
    const createPetInfoId = petInfoRes.rows[0].id;

    //   //! pet photo table
    const petPhotoQuery = `
  INSERT INTO pet_photo
  (pet_info_id, photo_url)
  VALUES
  ($1, $2)
  `;
    await connection.query(petPhotoQuery, [createPetInfoId, ...petPhoto]);

    await connection.query("COMMIT;");
    res.sendStatus(201);
    connection.release();
    
  } catch (error) {
    console.log("error", error);
    
    if(connection){
    connection.query("ROLLBACK;");
    connection.release();
    }
    res.sendStatus(500);
  }
});

module.exports = router;

// //! user table
// const userQuery = `
// INSERT INTO user
// (username, password, auth_level)
// VALUES
// ($1, $2, $3)
// RETURNING id;
// `
// const userValues = [createPetPhotoId, user]
// const userRes = await connection.query(userQuery, userValues)
// const createUserId = userRes.rows[0].id
