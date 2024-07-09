const express = require("express");
const router = express.Router();
const { registerPet, getPetOwner, getPetProfile, editProfile, editStatus } = require("../controllers/petController");

router.post("/register", registerPet);
router.get("/petOwner", getPetOwner);
router.get("/profile/:id", getPetProfile);
router.put("/editStatus/:id", editStatus);
router.put("/editProfile/:id", editProfile);

module.exports = router;