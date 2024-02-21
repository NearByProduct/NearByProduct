const express = require("express");
const router = express.Router();
const { createOrder,deleteOrder} = require("../controller/orderController");
router.post("/create",createOrder);
router.delete("/delete/:id",deleteOrder);
module.exports = router;