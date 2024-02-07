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
SELECT * FROM "pet_info";
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
  console.log("/cat POST route", req.body);
  console.log("is authenticated?", req.isAuthenticated());
  console.log("user", req.user);
  if(req.isAuthenticated()) {
    let queryText = `
    INSERT INTO "pet_info" ("owner_id", "medical_record_id", "name", "birthdate", "microchip_id")
    VALUES ($1, $2, $3, $4, $5);`

    let queryParams = [req.body.owner_id, req.body.medical_record_id, req.body.name, req.body.birthdate, req.body.microchip_id]
    pool
    .query(queryText, queryParams)
    .then((result) => {
      res.sendStatus(201)
    })
      .catch((error) => {
        console.log("error", error)
        res.sendStatus(500);
      })
    }
    else{
      res.sendStatus(403)
    }
    })

module.exports = router;
