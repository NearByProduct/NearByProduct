const mongoose = require("mongoose");

const product = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    actualPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    sellingPrice: {
      type: Number,
      required: true,
    },
    images: [
      {
        type: String,
        required: true,
      },
    ],
    stock: {
      type: Number,
      required: true,
    },
    rating: {
      type: Number,
    },
    totalRating: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: true,
    },
    shopId: {
      type: mongoose.Schema.ObjectId,
      ref: "Shop",
    },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", product);
module.exports = ProductModel;