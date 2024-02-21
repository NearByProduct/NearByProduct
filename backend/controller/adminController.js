const customError = require("../middleware/customError");
const Track = require("../models/tracking");

module.exports.getAllProductsInProcessing = async (req, res, next) => {
  try {
    const processingOrders = await Track.find({ status: "processing" });
    if (processingOrders) {
      res.status(200).json({
        success: true,
        processingOrders,
      });
    } else {
      next(new customError("no products now", 400));
    }
  } catch (err) {
    next(new customError("no products now", 400));
  }
};
