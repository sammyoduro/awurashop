var express = require("express");
const {
  categoryList,
  createCategory,
  saveCategory,
  brandList,
  createBrand,
  saveBrand,
  measurementList,
  createMeasurement,
  saveMeasurement,
  productList,
  createProduct,
  updateProductList,
  saveProduct,
  storeStock,
  saveStoreStock,
} = require("../controller/products.controller");
var router = express.Router();

/* GET users listing. */
router.get("/", productList);
router.put("/", updateProductList);
router.get("/Category", categoryList);
router.get("/Category/New", createCategory);
router.post("/Category/New", saveCategory);
router.get("/Brand", brandList);
router.get("/Brand/New", createBrand);
router.post("/Brand/New", saveBrand);
router.get("/Measurement", measurementList);
router.get("/Measurement/New", createMeasurement);
router.post("/Measurement/New", saveMeasurement);
router.get("/store-stock-management/:id", storeStock);
router.put("/store-stock-management/:id", saveStoreStock);
router.get("/New", createProduct);
router.post("/New", saveProduct);

module.exports = router;
