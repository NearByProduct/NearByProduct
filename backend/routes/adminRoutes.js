const express = require("express");
const {
  getAllProductsInProcessing,
  allocateOrders,
  createPayment,
  paySeller,
  payRider,
} = require("../controller/adminController");
const router = express.Router();

router.get("/get", getAllProductsInProcessing);
router.post("/allocateOrder/:trackingid", allocateOrders);
router.post("/createpayment", createPayment);
router.post("/payseller", paySeller);
router.post("/payrider", payRider);
