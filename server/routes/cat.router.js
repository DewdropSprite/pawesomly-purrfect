const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();


/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  console.log("/cat GET route");
  console.log("is authenticate?", req.isAuthenticated());
  console.log("user", req.user);

  if (req.isAuthenticated()){
  // let queryText = `SELECT * FROM pet_info;`
  let queryText = `
SELECT "pet_info".*, "pet_photo"."photo_url"
FROM "pet_info"
JOIN "pet_photo" ON "pet_info"."pet_photo_id" = "pet_photo"."id";
  `
  pool
  .query(queryText)
  .then((result) => {
    res.send(result.rows);
  })
  .catch((error) => {
    console.log("error",error);
    res.sendStatus(500);
  });
  }else
  {res.sendStatus(403)}
});

/**
 * POST route template
 */
router.post('/', async (req, res) => {
  // POST route code here
  const {ownerId, name, birthdate, microchip_id, distemper, rabies, annual_checkup, spay_neuter, photo_url} = req.body;
  console.log("newCat in POST:", req.body)

  try{
    await pool.query('BEGIN');

    const queryTextMedicalRecord= await pool.query(`  
    INSERT INTO "medical_record" ("birthdate", "microchip_id", "distemper", "rabies", "annual_checkup", "spay_neuter")
    VALUES ($1,$2,$3,$4,$5,$6)
    RETURNING "id" INTO "medical_record_id"`, [birthdate, microchip_id, distemper, rabies, annual_checkup, spay_neuter]
)
const medicalRecordId = queryTextMedicalRecord.rows[0].id;

const queryTextPetPhoto = await pool.query(
`  INSERT INTO "pet_photo" ("photo_url")
VALUES ($7)
RETURNING "id"`, [photo_url]
)
const petPhotoId = queryTextPetPhoto.rows[0].id;

await pool.query(
  `  INSERT INTO "pet_info" ("name", "owner_id", "medical_record_id", "pet_photo_id")
  VALUES ($8,$9,$10,$11)`, [name, ownerId, medicalRecordId, petPhotoId]
);
await pool.query('COMMIT');
res.send("New pet was added successfully!");
}
catch(error){
  await pool.query('ROLLBACK');
  console.log("error", error)
  res.sendStatus(500)
}
});


module.exports = router;
