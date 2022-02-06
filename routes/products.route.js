var express = require("express");
const {
  getPage,
  createProduct,
  saveProductPage,
} = require("../controller/products.controller");
var router = express.Router();

/* GET users listing. */
router.get("/", getPage);
router.get("/New", createProduct);
router.post("/New", saveProductPage);

module.exports = router;
