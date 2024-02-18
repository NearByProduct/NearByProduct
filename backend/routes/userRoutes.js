const express = require("express");
const {
  signup,
  createActualUser,
  login
} = require("../controller/userController");
const router = express.Router();

router.post("/signup", signup);
router.post("/activation", createActualUser);
router.post("/login", login);

module.exports = router;
