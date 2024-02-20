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
  removeItemFromCart,
  wishlistItems,
  removeItemFromWishlist,
  addToCart,
  addToWishlist,
  wishlistToCart,
  cartToWishlist
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

router.get("/wishlistItems/:id", wishlistItems);
router.delete("/removefromwishlist/:user/:id", removeItemFromWishlist);

router.post("/cart/:user/:id", addToCart);
router.post("/wishlist/:user/:id", addToWishlist);

router.post("/wishlistToCart/:user/:id", wishlistToCart);
router.post("/cartToWishlist/:user/:id", cartToWishlist);

module.exports = router;
