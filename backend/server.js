const express = require("express");
const app = express();
const cookie = require("cookie-parser");
var jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const fileupload = require("express-fileupload");
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
const userRoutes = require("./routes/userRoutes");
const shopRoutes = require("./routes/shopRoutes");
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const deliveryAgentRoutes = require("./routes/deliveryAgentRoutes");
const adminRoutes = require("./routes/adminRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const errorHandler = require("./utils/errorHanler");
const connectDb = require("./config/database");
const cors = require("cors");
app.use(cookie());
dotenv.config();
app.use(fileupload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
// app.use(cors({
//     origin:"http://localhost:8000",
//     credentials:true
// }));

cloudinary.config({
  cloud_name: "drt8pxy1q",
  api_key: "578449198298885",
  api_secret: "TDSnd4NoPgZ9NdsUz9LaRg5u8oU",
});

app.use("/uploads", express.static("uploads"));
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/shop", shopRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/rider", deliveryAgentRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/payment", paymentRoutes);

app.use("/api/v1/getkey", (req, res) =>
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
);

app.use(errorHandler);
connectDb();
const server = app.listen(process.env.PORT, () => {
  console.log("server is running on port " + process.env.PORT);
});
module.exports = app;
