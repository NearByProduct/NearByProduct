const express = require("express");
const { checkout} = require("../controller/paymentController");
const router = express.Router();
router.post("/checkout",checkout);
module.exports = router;