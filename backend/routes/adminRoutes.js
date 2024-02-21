const express = require("express");
const { getAllProductsInProcessing } = require("../controller/adminController");
const router = express.Router();

router.get("/get", getAllProductsInProcessing);
