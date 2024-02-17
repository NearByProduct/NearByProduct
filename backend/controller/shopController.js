const customError = require("../middleware/customError");
const Shop = require("../models/shop");

const customResponse = (message, success, res) => {
  res.status(400).json({
    success: success,
    message: message,
  });
};

module.exports.createShop = async (req, res, next) => {
  let data = req.body;
  const {
    shopname,
    ownername,
    email,
    contactNumber,
    aadharCard,
    address,
    latitude,
    longitude,
    category,
  } = data;

  try {
    const shop = await Shop.findOne({ email });

    if (shop) {
      customResponse("Shop already exists", false, res);
    } else {
      const shopCreated = await Shop.create({
        shopname,
        ownername,
        email,
        contactNumber,
        aadharCard,
        address,
        latitude,
        longitude,
        category,
      });

      res.status(200).json({
        success: true,
        message: "Shop created successfully",
        shopCreated,
      });
    }
  } catch (err) {
    next(new customError(err.message,404));
  }
};

module.exports.getshopInfo = async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  try {
    const shop = await Shop.findById(id);
    if (!shop) {
      customResponse("shop Not Found", false, res);
    } else {
      res.status(200).json({
        success: true,
        message: "shop Found Succesfully",
        shop: shop,
      });
    }
  } catch (err) {
    next(new customError(err.message, 404));
  }
};

module.exports.updateShopInfo = async (req, res, next) => {
  console.log("inside updateShopInfo");
  try {
    const id = req.params.id;
    const data = req.body;
    const { postalCode, state, district, city } = data;
    data.address = { state, city, district, postalCode };
    console.log("data is ", data);
    const updateshop = await Shop.findByIdAndUpdate(id, data, { new: true });
    if (!updateshop) {
      customResponse("Update Product Failed", 400, res);
    } else {
      res.status(200).json({
        success: true,
        message: "shop Updated Succesful",
        shop: updateshop,
      });
    }
  } catch (error) {
    next(customError(error.message, 500));
  }
};
