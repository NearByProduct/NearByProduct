const express = require("express");
const {
  signup,
  createActualUser,
  
} = require("../controller/userController");
const router = express.Router();

router.post("/signup", signup);
router.post("/activation", createActualUser);

module.exports = router;
