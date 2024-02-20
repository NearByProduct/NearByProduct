const express = require("express");
const {
  signup,
  createActualUser,
  login,
  getUser,
  updateUser,
  deleteUser,
  orders
} = require("../controller/userController");
const router = express.Router();

router.post("/signup", signup);
router.post("/activation", createActualUser);
router.post("/login", login);
router.get("/get/:id", getUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

router.get("/getallorders/:id", orders);

module.exports = router;
