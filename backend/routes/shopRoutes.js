const express = require("express");
const {
  createShop,
  getshopInfo,
  updateShopInfo,
  getAllProduct,
  getAllOrderOfShop,
  createOtp
} = require("../controller/shopController");
const router = express.Router();

router.post("/create", createShop);
router.get("/get/:id", getshopInfo);
//router.post("/updateshop/:id",updateShopInfo);
router.put("/updateshop/:id", updateShopInfo);
router.get("/getAllProduct/:id", getAllProduct);
router.get("/createotp/:id", createOtp);
router.get("/getallorderofshop/:id", getAllOrderOfShop);
module.exports = router;
