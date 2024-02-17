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
const errorHandler = require("./utils/errorHanler");
const connectDb = require("./config/database");
const cors = require("cors");
dotenv.config();
app.use(fileupload());
console.log("hello");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookie());
app.use(cors());

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
app.use(errorHandler);
connectDb();
const server = app.listen(process.env.PORT, () => {
  console.log("server is running on port " + process.env.PORT);
});

console.log(server);
module.exports = app;
