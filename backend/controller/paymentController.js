const customError = require("../middleware/customError");
const razorpay = require("razorpay");
const dotenv = require("dotenv");
const Payment = require("../models/payment");
const crypto = require("crypto");
const { createOrder } = require("./orderController");
dotenv.config();

const instance = new razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

module.exports.checkout = async (req, res, next) => {
  const options = {
    amount: Number(req.body.amount * 100), // it is written smallest currency unit which is paise
    currency: "INR",
  };

  try {
    const order = await instance.orders.create(options);
    console.log(order);
    res.status(200).json({
      success: true,
      order,
    });
  } catch (err) {
    next(new customError("Not able to create order", 400));
  }
};
