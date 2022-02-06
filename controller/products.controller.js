const loop = require("../helpers/loop");
const categoryModel = require("../model/category.model");
const productModel = require("../model/product.model");
const storesModel = require("../model/stores");

module.exports = {
  getPage: async (req, res) => {
    var products = await productModel.find({}).sort({ _id: -1 });
    res.render("product/index", {
      products,
      breadcrumb:
        "<li class='breadcrumb-item'><a href='/Dashboard'>Dashboards</a></li><li class='breadcrumb-item active' aria-current='page'>Products</li>",
    });
  },
  createProduct: async (req, res) => {
    var storeList = await storesModel.find({}).sort({ _id: -1 });
    var categoryList = await categoryModel.find({}).sort({ _id: -1 });
    res.render("product/new", {
      breadcrumb:
        "<li class='breadcrumb-item'><a href='/Dashboard'>Dashboards</a></li><li class='breadcrumb-item'><a href='/Products'>Products</a></li><li class='breadcrumb-item active' aria-current='page'>New Product</li>",
      categoryList,
      storeList,
    });
  },
  saveProductPage: async (req, res) => {
    try {
      req.checkBody("store", "field is required").notEmpty().trim();
      req.checkBody("itemName", "field is required").notEmpty().trim();
      req.checkBody("category", "field is required").notEmpty().trim();
      req
        .checkBody("purchasePrice", "purchase price must be between 1 to 5000")
        .notEmpty()
        .trim()
        .isFloat({ min: 1, max: 5000 });
      req
        .checkBody("salePrice", "Sale price must be between 1 to 5000")
        .notEmpty()
        .trim()
        .isFloat({ min: 1, max: 5000 });
      req.checkBody("stock", "invalid entry").notEmpty().trim().isNumeric();
      let parseErrors = req.validationErrors();
      parseErrors = parseErrors ? loop.passErrData(parseErrors) : "";
      if (parseErrors) {
        res.send({ status: 0, parseErrors });
      } else {
        var product = new productModel();
        product.branch = req.body.store;
        product.itemName = req.body.itemName;
        product.category = req.body.category;
        product.salePrice = req.body.salePrice;
        product.purchasePrice = req.body.purchasePrice;
        product.stock = req.body.stock;
        product.save();
        res.json({
          status: 1,
          succMsg: `Product (${req.body.itemName}) saved!`,
        });
        res.end();
      }
    } catch (error) {
      throw error;
    }
  },
};
