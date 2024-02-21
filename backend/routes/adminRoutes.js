const express = require("express");
const { getAllProductsInProcessing , allocateOrders} = require("../controller/adminController");
const router = express.Router();

router.get("/get", getAllProductsInProcessing);
router.post("/allocateOrder/:trackingid", allocateOrders);