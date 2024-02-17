const express = require("express");
const {
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
  searchProducts
} = require("../controller/productController");
const router = express.Router();

router.get("/get/:id", getProduct);
router.get("/search",searchProducts);
router.post("/create", createProduct);
router.put("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);


module.exports = router;