const customError = require("../middleware/customError");
const Order = require("../models/order");

module.exports.createOrder = async (req, res, next) => {
  let data = req.body;

  try {
    const orderCreated = await Order.create(data);
    if (!orderCreated) {
      next(new customError("Order not placed", 400));
    } else {
      res.status(200).json({
        success: true,
        message: "Order placed successfully",
        orderCreated,
      });
    }
  } catch (err) {
    next(new customError(err.message, 404));
  }
};
