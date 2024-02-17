const express=require("express");
const { createShop, getshopInfo, updateShopInfo } = require("../controller/shopController");
const router=express.Router();

router.post("/create",createShop);
router.get('/get/:id',getshopInfo);
//router.post("/updateshop/:id",updateShopInfo);
router.put("/updateshop/:id",updateShopInfo);
module.exports = router;