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

module.exports.getAllProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const queryobj = req.query;
    console.log(queryobj);
    const query = {};
    const sortingObj = {};
    if (queryobj.subcategory) {
      query.subcategory = queryobj.subcategory;
    }
    if (queryobj.category) {
      query.category = queryobj.category;
    }
    if (queryobj.rating) {
      query.rating = { $gte: parseFloat(queryobj.rating) };
    }
    if (queryobj.from && queryobj.to) {
      query.price = {
        $lte: parseFloat(queryobj.to),
        $gte: parseFloat(queryobj.from),
      };
    } else if (queryobj.from) {
      query.price = { $gte: parseFloat(queryobj.from) };
    } else if (queryobj.to) {
      query.price = { $lte: parseFloat(queryobj.to) };
    }
    if (queryobj.sortOnsellingPrice) {
      sortingObj.sellingPrice = queryobj.sortOnsellingPrice === "asc" ? 1 : -1;
    }
    if (queryobj.sortOnrating) {
      sortingObj.rating = queryobj.sortOnrating === "asc" ? 1 : -1;
    }
    const shopId = await Shop.findById(id).populate("productId").exec();
    const productIds = shopId.productId.map((product) => product._id);
    //const productToReturn=await Product.find({_id:{$in:productIds},rating:req.query.rating}).sort({sellingPrice:-1});
    const productToReturn = await Product.find({
      _id: { $in: productIds },
      ...query,
    }).sort({ ...sortingObj });
    //  console.log(shopId.productId);
    console.log(productIds);
    res.status(200).json({
      success: true,
      message: "get all Product Of Shop",
      productToReturn: productToReturn,
    });
  } catch (err) {
    next(new customError(err.message, 404));
  }
};

module.exports.getAllOrderOfShop = async (req, res, next) => {
  try {
    const shopId = req.params.shopid;
    const order = await Order.find({}) // Find all orders
      .populate({
        path: "orderItems.product",
      })
      .exec();
    if (!order) {
      next(new customError("No Order Is Found For this shop", 501));
    } else {
      const matchedProducts = order.flatMap((orders) =>
        orders.orderItems.filter(
          (item) => item.product.shopId.toString() === shopId
        )
      );
      if (matchedProducts.length == 0) {
        next(new customError("No orders placed currently from your shop", 400));
      } else {
        res.status(200).json({
          success: true,
          message: "All the Orders",
          order: matchedProducts,
        });
      }
    }
  } catch (err) {
    next(new customError(err.message, 403));
  }
};
