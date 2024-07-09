const express = require("express");
const router = express.Router();
const { addVisit, getAllVisits } = require("../controllers/visitController");

router.post("/addVisit", addVisit);
router.get("/getAll", getAllVisits);

module.exports = router;