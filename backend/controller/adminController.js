const customError = require("../middleware/customError");
const Track = require("../models/tracking");
const Rider = require("../models/rider");

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

module.exports.allocateOrders = async (req, res, next) => {
  let trackingId = req.params.trackingid;
  try {
    const trackingItem = await Track.findById(trackingId)
      .populate({ path: "productId", populate: { path: "shopId" } })
      .exec();
    console.log(trackingItem);

    if (trackingItem) {
      const shopCity = trackingItem.productId.shopId.address.city;
      console.log(shopCity);

      try {
        const ridersInShopCity = await Rider.find({ city: shopCity }).sort({
          rating: -1,
          "completedOrder.length": -1,
        });

        console.log(ridersInShopCity);

        if (ridersInShopCity.length == 0) {
          next(new customError("no rider is available", 400));
        } else {
          const rider = ridersInShopCity[0];
          const riderId = rider._id;
          trackingItem.riderId = riderId;
          rider.allocatedOrder.push({ TrackId: trackingId });
          const riderName = rider.name;
          trackingItem.status = "picked up";

          await trackingItem.save();
          await rider.save();

          console.log(rider.allocatedOrder);
          console.log(trackingId, " has been handed over to ", riderName);

          res.status(200).json({
            success: true,
            message: "order has been allocated",
            trackingItem,
          });
        }
      } catch (err) {
        next(new customError(err.message, 404));
      }
    } else {
      next(new customError("Tracking id not found", 400));
    }
  } catch (err) {
    next(new customError("product not allocated", 400));
  }
};
