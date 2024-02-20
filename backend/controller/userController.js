const customError = require("../middleware/customError");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/sendMail");
const Product = require("../models/product");
const Track = require("../models/tracking");

const sendToken = async (user, statusCode, message, res) => {
  const token = user.getToken();
  console.log("hello");
  // options for cookies
  //const COOKIES_EXPIRES=Number
  res.cookie("token", token, {
    expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days in milliseconds
    httpOnly: true,
  });
  return res.status(statusCode).json({
    user: user,
    message: message,
    success: true,
  });
};

module.exports.signup = async (req, res, next) => {
  console.log("inside signup");
  const { name, email, password } = req.body;

  try {
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    console.log("inside controller");
    console.log(name, email, password);

    const user = await User.findOne({ email: email });

    if (user) {
      throw new customError("User Already Exists", 400); // Throw error instead of using next()
    }

    const newUserToBeCreated = {
      fullname: name,
      email: email,
      password: password,
      image: myCloud.url, // Accessing the URL property of myCloud directly
    };

    const activationToken = createActivationToken(newUserToBeCreated);

    const activationUrl = `http://localhost:3000/activation/${activationToken}`;

    console.log(newUserToBeCreated.email);

    await sendEmail({
      email: newUserToBeCreated.email,
      subject: "Activate Your Account",
      message: `Hello ${newUserToBeCreated.fullname} Please Click To Activate On The Link For Your Account: ${activationUrl}`,
    });

    res.status(200).json({
      success: true,
      user: "user needs to br crested",
      message: "email sent",
    });
  } catch (err) {
    next(new customError(err.message, err.statusCode || 500)); // Pass the status code if available
  }
};

module.exports.createActualUser = async (req, res, next) => {
  console.log("called Actual");
  const { activationToken } = req.body;
  console.log("activationToken", activationToken);
  const newuser = await jwt.verify(
    activationToken,
    process.env.jwtActivationSecret
  );
  console.log(newuser);
  const { id } = newuser;
  if (!newuser) {
    next(new customError("ToKen Expired", 400));
  }
  try {
    const u = await User.create(id);
    sendToken(u, 201, "User Created Succesfully", res);
  } catch (err) {
    next(new customError(err.message, 500));
  }
};

const createActivationToken = (user) => {
  return jwt.sign({ id: user }, process.env.jwtActivationSecret, {
    expiresIn: "5m",
  });
};

module.exports.login = async (req, res, next) => {
  let data = req.body;
  const { email, password } = data;
  const user = await User.findOne({ email: email }).select("+password");
  console.log(user);
  if (!user) {
    res.status(404).json({
      success: false,
      message: "User not found",
    });
  } else {
    try {
      console.log("1");
      const passMatch = await user.checkPassword(password);
      console.log("2");
      if (!passMatch) {
        res.status(401).json({
          success: false,
          message: "Unauthorized user",
        });
      } else {
        sendToken(user, 201, "Login Succesful", res);
      }
    } catch (err) {
      console.log("sere");
      next(new customError(err.message, 400));
    }
  }
};

module.exports.getUser = async (req, res, next) => {
  let id = req.params.id;

  try {
    const user = await User.findById(id);
    if (user) {
      res.status(200).json({
        success: true,
        message: "user found",
        user,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "user not found",
      });
    }
  } catch (err) {
    next(new customError(err));
  }
};

module.exports.updateUser = async (req, res, next) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true });
    if (updatedUser) {
      res.status(200).json({
        success: true,
        message: "user updated successfully",
        updatedUser,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "failed to update user",
      });
    }
  } catch (err) {
    next(new customError(err));
  }
};

module.exports.deleteUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    const deletecheck = await User.findByIdAndDelete(id);
    if (deletecheck) {
      res.status(200).json({
        success: true,
        message: "user deleted successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "failed to delete user",
      });
    }
  } catch (err) {
    next(new customError(err));
  }
};

module.exports.orders = async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id)
      .populate({
        path: "order",
        populate: {
          path: "orderId", // Populate the product field in orderItems
        },
      })
      .exec();
    if (!user) {
      next(new customError("orders for this user is not found", 404))
        .populate("order")
        .exec();
    } else {
      res.status(200).json({
        success: true,
        message: "All Orders Received at dashboard",
        order: user.order,
      });
    }
  } catch (err) {
    next(new customError(err.message, 501));
  }
};

module.exports.cartItems = async (req, res, next) => {
  let userId = req.params.id;

  try {
    const user = await User.findById(userId)
      .populate({ path: "cart.productId" })
      .exec();
    console.log(user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const cartItems = user.cart;
    console.log(cartItems);

    if (cartItems) {
      res.status(200).json({
        success: true,
        cartItems,
      });
    } else {
      res.status(200).json({
        success: false,
        message: "No items in cart",
      });
    }
  } catch (err) {
    next(new customError("Not able to fetch user cart items", 400));
  }
};

module.exports.removeItemFromCart = async (req, res, next) => {
  let userId = req.params.user;
  let productId = req.params.id;
  console.log(userId, productId);

  try {
    const user = await User.findById(userId);
    console.log("user is", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await user.updateOne({ $pull: { cart: { productId: productId } } });

    const updatedUser = await User.findById(userId);
    const cartItems = updatedUser.cart || [];

    res.status(200).json({
      success: true,
      cartItems,
    });
  } catch (err) {
    next(new customError("Not able to fetch user cart items", 400));
  }
};

module.exports.wishlistItems = async (req, res, next) => {
  let userId = req.params.id;

  try {
    const user = await User.findById(userId)
      .populate({ path: "wishlist.productId" })
      .exec();
    console.log(user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const wishlistItems = user.wishlist;
    console.log(wishlistItems);

    if (wishlistItems) {
      res.status(200).json({
        success: true,
        wishlistItems,
      });
    } else {
      res.status(200).json({
        success: false,
        message: "No items in wishlist",
      });
    }
  } catch (err) {
    next(new customError("Not able to fetch user wishlist items", 400));
  }
};

module.exports.removeItemFromWishlist = async (req, res, next) => {
  let userId = req.params.user;
  let productId = req.params.id;
  console.log(userId, productId);

  try {
    const user = await User.findById(userId);
    console.log("user is", user);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await user.updateOne({ $pull: { wishlist: { productId: productId } } });

    const updatedUser = await User.findById(userId);
    const wishlistItems = updatedUser.wishlist || [];

    res.status(200).json({
      success: true,
      wishlistItems,
    });
  } catch (err) {
    next(new customError("Not able to fetch user wishlist items", 400));
  }
};

module.exports.addToCart = async (req, res, next) => {
  let id = req.params.id;
  let userId = req.params.user;
  console.log(id, userId);
  try {
    const user = await User.findById(userId);
    if (!user) {
      next(new customError("User not found", 400));
    } else {
      const isProductInCart = user.cart.some(
        (item) => item.productId.toString() === id
      );

      if (isProductInCart) {
        next(new customError("Item already in cart", 400));
      } else {
        user.cart.push({ productId: id });
        await user.save();

        res.status(200).json({
          success: true,
          message: "Added to cart",
          user,
        });
      }
    }
  } catch (err) {
    next(new customError("product not added to cart", 400));
  }
};

module.exports.addToWishlist = async (req, res, next) => {
  let id = req.params.id;
  let userId = req.params.user;
  try {
    const user = await User.findById(userId);
    if (!user) {
      next(new customError("User not found", 400));
    } else {
      const isProductInWishlist = user.wishlist.some(
        (item) => item.productId.toString() === id
      );

      if (isProductInWishlist) {
        console.log("inside");
        next(new customError("product already in wishlist", 400));
      } else {
        user.wishlist.push({ productId: id });
        await user.save();

        res.status(200).json({
          success: true,
          message: "Added to wishlist",
          user,
        });
      }
    }
  } catch (err) {
    next(new customError("product not added to wishlist", 400));
  }
};

module.exports.wishlistToCart = async (req, res, next) => {
  let id = req.params.id;
  let userId = req.params.user;
  try {
    const user = await User.findById(userId);
    if (!user) {
      next(new customError("User not found", 400));
    } else {
      const isProductInCart = user.cart.some(
        (item) => item.productId.toString() === id
      );

      if (isProductInCart) {
        next(new customError("product already in cart", 400));
      } else {
        const wishlist = user.wishlist.filter(
          (item) => item.productId.toString() != id
        );
        console.log(wishlist);
        user.wishlist = wishlist;

        user.cart.push({ productId: id });
        await user.save();

        res.status(200).json({
          success: true,
          message: "Item moved from wishlist to cart",
          user,
        });
      }
    }
  } catch (err) {
    next(new customError("Unable to move item from wishlist to cart", 400));
  }
};

module.exports.cartToWishlist = async (req, res, next) => {
  let id = req.params.id;
  let userId = req.params.user;
  try {
    const user = await User.findById(userId);
    if (!user) {
      next(new customError("User not found", 400));
    } else {
      const isProductInWishlist = user.wishlist.some(
        (item) => item.productId.toString() === id
      );

      console.log("ans is ", isProductInWishlist);

      if (isProductInWishlist) {
        next(new customError("product already in wishlist", 400));
      } else {
        const cart = user.cart.filter(
          (item) => item.productId.toString() != id
        );
        console.log(cart);
        user.cart = cart;

        user.wishlist.push({ productId: id });
        await user.save();

        res.status(200).json({
          success: true,
          message: "Item moved from cart to wishlist",
          user,
        });
      }
    }
  } catch (err) {
    next(new customError("Unable to move item from cart to wishlist", 400));
  }
};

