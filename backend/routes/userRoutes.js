const express = require("express");
const {
  signup,
  createActualUser,
  login,
  getUser
} = require("../controller/userController");
const router = express.Router();

router.post("/signup", signup);
router.post("/activation", createActualUser);
router.post("/login", login);
router.get("/get/:id", getUser);

module.exports = router;
