const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const multer = require("multer");
const path = require('path');

router.get("/", async (req, res) => {
  console.log("/cat GET route");
  console.log("is authenticated?", req.isAuthenticated());
  console.log("user", req.user);

  if(req.isAuthenticated()){
  let connection;

  try {
    connection = await pool.connect(); // Get a connection from the pool

    const userId = req.user.id

    const query = `
      SELECT * FROM pet_info
      JOIN medical_record ON pet_info.medical_record_id = medical_record.id
      JOIN pet_photo ON pet_info.id = pet_photo.pet_info_id
      WHERE pet_info.user_id = $1;
      `; 

    const result = await connection.query(query, [userId]);
    const pets = result.rows;

    res.json(pets); // Send the result back to the client
  } catch (error) {
    console.error("Error fetching pets:", error);
    res.sendStatus(500); // Internal Server Error
  } finally {
    if (connection) {
      connection.release(); // Always release the connection
    }
  }} else{
    res.sendStatus(403);
  }
});

// Set up multer storage
const storage = multer.diskStorage({
  destination: path.resolve(__dirname,'../..', 'public/Images/'),


  filename: function (req, file, cb) {
    // Define how files should be named
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname);
  }
});

// Configure multer instance
const upload = multer({ storage: storage });

router.post("/", upload.single('photo_url'), async (req, res) => {
  console.log("post router")
  console.log("/cat POST route", req.body);
  console.log("is authenticate?", req.isAuthenticated());
  console.log("user", req.user);
  if (req.isAuthenticated()) {
  let connection;
  

  try {
    const user = req.user.id;

    const {
      birthdate,
      microchip_id,
      distemper,
      rabies,
      annual_checkup,
      spay_neuter,
      name,
      user_id
    } = req.body;

    console.log("req.body", JSON.stringify(req.body));
    console.log("req.user.id", user);

    const medicalRecord = [
      birthdate,
      microchip_id,
      distemper,
      rabies,
      annual_checkup,
      spay_neuter,
    ];
    console.log("medicalRecord", medicalRecord);

    const petInfo = [name, user];
    console.log("petInfo", petInfo);

    const photoUrl = req.file ? `/Images/${req.file.filename}` : null;
    // const petPhoto = [req.file.path];
    console.log("photoUrl", photoUrl);

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
  (name, user_id, medical_record_id)
  VALUES
  ($1, $2, $3)
  RETURNING id;
  `;

    const petInfoRes = await connection.query(petInfoQuery, [
      ...petInfo,
      createMedicalRecordId,
    ]);
    const createPetInfoId = petInfoRes.rows[0].id;

    //   //! pet photo table
    if(photoUrl){
    const petPhotoQuery = `
  INSERT INTO pet_photo
  (pet_info_id, photo_url)
  VALUES
  ($1, $2)
  `;
    await connection.query(petPhotoQuery, [createPetInfoId, photoUrl]);
  }
    await connection.query("COMMIT;");
    res.sendStatus(201);
    // connection.release();
  }
  catch (error) {
    console.log("error", error);

    if (connection) {
      await connection.query("ROLLBACK;");
    }
    res.sendStatus(500);
  }
  finally {
    if(connection){
      connection.release();
    }
  }
}else {
  res.sendStatus(500)
};
});


router.delete("/:id", async (req, res) => {
  let connection;
  try {
    const catId = parseInt(req.params.id);

    connection = await pool.connect();
    await connection.query("BEGIN;");

    const deletePhotoQuery = `
    DELETE FROM pet_photo
    WHERE pet_info_id = $1;
    `;

    await connection.query(deletePhotoQuery, [catId]);

    const medicalRecordIdQuery = `
    SELECT medical_record_id
    FROM pet_info
    WHERE id = $1;
    `;

    const medicalRecordIdResponse = await connection.query(
      medicalRecordIdQuery,
      [catId]
    );
    const medicalRecordId = medicalRecordIdResponse.rows[0]?.medical_record_id;

    const deletePetInfoQuery = `
    DELETE FROM pet_info
    WHERE id = $1;
    `;

    await connection.query(deletePetInfoQuery, [catId]);
    if (medicalRecordId) {
      const deleteMedicalRecordQery = `
      DELETE FROM medical_record
      WHERE id = $1;
      `;
      await connection.query(deleteMedicalRecordQery, [medicalRecordId]);
    }
    await connection.query("COMMIT;");
    console.log("record was deleted successfully");
    connection.release();
  } catch (error) {
    console.log("error", error);
    if (connection) {
      await connection.query("ROLLBACK;");
      connection.release();
    }
    res.sendStatus(500);
  }
});


//! name
router.put("/name/:id", (req, res) => {
  const idToUpdate = req.params.id;
  const sqlName = `
  UPDATE pet_info 
  SET name = $1 WHERE id = $2;`
  pool.query(sqlName, [req.body.name, idToUpdate])
  .then((result)=> {
    res.sendStatus(200)})
  .catch((error) => {
    console.log('Error', error)
    res.sendStatus(500)})
})

// //! birthdate
router.put("/birthdate/:id", (req, res) => {
  const idToUpdate = req.params.id;

  const sqlBirthdate = `
  UPDATE medical_record 
  SET birthdate = $1 WHERE id = $2;`
  pool.query(sqlBirthdate, [req.body.birthdate, idToUpdate])
  .then((result)=> {
    res.sendStatus(200)})
  .catch((error) => {
    console.log('Error', error)
    res.sendStatus(500)})
})

// //! microchip
router.put("/microchip/:id", (req, res) => {
  const idToUpdate = req.params.id;
  const sqlMicrochip = `
  UPDATE medical_record
  SET microchip_id = $1 WHERE id = $2;`
  pool.query(sqlMicrochip, [req.body.microchip_id, idToUpdate])
  .then((result)=> {
    res.sendStatus(200)})
  .catch((error) => {
    console.log('Error', error)
    res.sendStatus(500)})
})

// //! rabies
/
router.put("/rabies/:id", (req, res) => {
  const idToUpdate = req.params.id;
  const sqlRabies = `
  UPDATE medical_record 
  SET rabies = $1 WHERE id = $2;`
  pool.query(sqlRabies, [req.body.rabies, idToUpdate])
  .then((result)=> {
    res.sendStatus(200)})
  .catch((error) => {
    console.log('Error', error)
    res.sendStatus(500)})
})

// //! distemper
router.put("/distemper/:id", (req, res) => {
  const idToUpdate = req.params.id;
  const sqlDistemper = `
  UPDATE medical_record 
  SET distemper = $1 WHERE id = $2;`
  pool.query(sqlDistemper, [req.body.distemper, idToUpdate])
  .then((result)=> {
    res.sendStatus(200)})
  .catch((error) => {
    console.log('Error', error)
    res.sendStatus(500)})
})

// //! checkup
router.put("/checkup/:id", (req, res) => {
  const idToUpdate = req.params.id;
  const sqlCheckup = `
  UPDATE medical_record
  SET annual_checkup = $1 WHERE id = $2;`
  pool.query(sqlCheckup, [req.body.annual_checkup, idToUpdate])
  .then((result)=> {
    res.sendStatus(200)})
  .catch((error) => {
    console.log('Error', error)
    res.sendStatus(500)})
})

// //! spay neuter
router.put("/spayneuter/:id", (req, res) => {
  const idToUpdate = req.params.id;
  const sqlSpayNeuter = `
  UPDATE medical_record
  SET spay_neuter = $1 WHERE id = $2;`
  pool.query(sqlSpayNeuter, [req.body.spay_neuter, idToUpdate])
  .then((result)=> {
    res.sendStatus(200)})
  .catch((error) => {
    console.log('Error', error)
    res.sendStatus(500)})
})


//! routes to add and get a cat to the "virtual cemetary" - currently not working as of 18 February
// router.post('/:id/cemetary', async (req, res) => {
//   const catId  = parseInt(req.params.id, 10);
//   let connection;

//   try {
//     connection = await pool.connect();
//     await connection.query('BEGIN');

// //Step 1 - fetch the info that needs to be moved:
//     const fetchCatInfo = `SELECT * FROM pet_info WHERE id=$1;`;
//     const catResult = await connection.query(fetchCatInfo, [catId]);
//     const cat = catResult.rows[0]

//     if (!cat)
//     {
//       res.status(404).send({ message: "Cat not found" })
//       return;
//     }

//     //Step 2 - Populate pet_cemetary table


//     const insertQueryText = `
//       INSERT INTO pet_cemetary (pet_info_id, name, photo_url, death_date, about)
//       VALUES ($1, $2, $3, CURRENT_DATE, 'Moved to virtual cemetary') RETURNING *;
//     `;
//     await connection.query(insertQueryText, [cat.id, cat.name, cat.photo_url]);
    
//     // Delete pet photo record

//     const deletePetPhotoText = `DELETE FROM pet_photo WHERE pet_info_id = $1;`;
//     await connection.query(deletePetPhotoText, [catId]);

//     //Step 3 - Delete from pet_info

//     const deleteQueryText = `DELETE FROM pet_info WHERE id = $1;`;
//     await connection.query(deleteQueryText, [catId]);

//     //Delete medical_record
//     const deleteMedicalQuery = `
//     DELETE FROM medical_record
//     WHERE id = $1;
//     `;
//     await connection.query(deleteMedicalQuery, [catId]);
  

//     await connection.query("COMMIT");
//     res.status(200).send("Pet was moved to the virtual cemetery successfully");
//   } catch (error) {
//     console.log("error adding to cemetery", error);
// await connection.query("ROLLBACK");
//     res.status(500).send("Error while adding to cemetery: ", error);
//   } finally {
//     if (connection) connection.release();
//   }
// });


// router.get('/cemetary', async (req, res) => {
//   let connection;
//   try {
//     connection = await pool.connect();
//     const queryText = 'SELECT * FROM pet_cemetary;'
//     const result = await connection.query(queryText);
//     const cats = result.rows;
//     res.json(cats);
//   } catch (error) {
//     console.error('Error retrieving pet cemetary:', error);
//     if(!res.headersSent)
//     res.status(500).send('Server error');
//   }finally {
//     if (connection) {
//       connection.release();
//     }
//   }
// });
module.exports = router;

