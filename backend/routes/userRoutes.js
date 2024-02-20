const express = require("express");
const {
  signup,
  createActualUser,
  login,
  getUser,
  updateUser,
  deleteUser,
  orders,
  cartItems,
  removeItemFromCart
} = require("../controller/userController");
const router = express.Router();

router.post("/signup", signup);
router.post("/activation", createActualUser);
router.post("/login", login);
router.get("/get/:id", getUser);
router.put("/update/:id", updateUser);
router.delete("/delete/:id", deleteUser);

router.get("/getallorders/:id", orders);

router.get("/cartitems/:id", cartItems);
router.delete("/removefromcart/:user/:id", removeItemFromCart);

module.exports = router;
