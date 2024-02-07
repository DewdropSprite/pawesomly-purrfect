const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
/**
 * GET route template
 */
router.get('/', (req, res) => {
  // GET route code here
  console.log("/medical GET route");
  console.log("is authenticate?", req.isAuthenticated());
  console.log("user", req.user);

  if (req.isAuthenticated()){
  let queryText = `
  SELECT 
    "pet_info"."id" AS "pet_id",
    "pet_info"."owner_id",
    "pet_info"."name" AS "pet_name",
    "medical_record"."birthdate" AS "pet_birthdate",
    "medical_record"."microchip_id" AS "pet_microchip",
    "medical_record"."distemper",
    "medical_record"."rabies",
    "medical_record"."annual_checkup",
    "medical_record"."spay_neuter"
FROM 
    "pet_info"
JOIN 
    "medical_record" ON "pet_info"."medical_record_id" = "medical_record"."id";
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
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
