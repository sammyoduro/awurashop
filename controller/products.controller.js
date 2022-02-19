const { InvoiceNumber } = require("invoice-number");

const loop = require("../helpers/loop");
const categoryModel = require("../model/category.model");
const brandModel = require("../model/brand.model");
const measurementModel = require("../model/measurement.model");
const productModel = require("../model/product.model");
const storesModel = require("../model/stores");
const storeProductsModel = require("../model/storeProducts.model");

module.exports = {
  categoryList: async (req, res) => {
    var categoryList = await categoryModel.find({}).sort({ _id: -1 });
    res.render("product/categoryList", {
      categoryList,
      breadcrumb:
        "<li class='breadcrumb-item'><a href='/Dashboard'>Dashboards</a></li><li class='breadcrumb-item'><a href='/Product'>Product</a></li><li class='breadcrumb-item active' aria-current='page'>Category</li>",
      page: "product",
      tab: "category",
      user: req.user,
    });
  },
  createCategory: (req, res) => {
    res.render("product/createCategory", {
      breadcrumb:
        "<li class='breadcrumb-item'><a href='/Dashboard'>Dashboards</a></li><li class='breadcrumb-item'><a href='/Product'>Product</a></li><li class='breadcrumb-item'><a href='/Product/Category'>Category</a></li><li class='breadcrumb-item active' aria-current='page'>New Category</li>",
      page: "product",
      tab: "category",
      errors: {},
      user: req.user,
    });
  },
  saveCategory: (req, res) => {
    try {
      //   validation
      req.checkBody("title", "field is required").notEmpty().trim();
      if (req.body.description != "") {
        req.checkBody("description", "field is required").notEmpty().trim();
      }

      let errors = req.validationErrors();
      errors = errors ? loop.passErrData(errors) : "";

      if (errors) {
        res.render("product/createCategory", {
          breadcrumb:
            "<li class='breadcrumb-item'><a href='/Dashboard'>Dashboards</a></li><li class='breadcrumb-item'><a href='/Product'>Product</a></li><li class='breadcrumb-item'><a href='/Product/Category'>Category</a></li><li class='breadcrumb-item active' aria-current='page'>New Category</li>",
          page: "product",
          tab: "product",
          errors,
          user: req.user,
        });
      } else {
        // save data
        var Category = new categoryModel();
        Category.title = req.body.title;
        Category.description = req.body.description;
        Category.save();
        req.flash("success", `Category (${req.body.title}) saved!`);
        res.redirect("/Product/Category");
      }
    } catch (error) {
      throw error;
    }
  },
  brandList: async (req, res) => {
    var brandList = await brandModel.find({}).sort({ _id: -1 });
    res.render("product/brandList", {
      brandList,
      breadcrumb:
        "<li class='breadcrumb-item'><a href='/Dashboard'>Dashboards</a></li><li class='breadcrumb-item'><a href='/Product'>Product</a></li><li class='breadcrumb-item active' aria-current='page'>Brand</li>",
      page: "product",
      tab: "brand",
      user: req.user,
    });
  },
  createBrand: (req, res) => {
    res.render("product/createBrand", {
      breadcrumb:
        "<li class='breadcrumb-item'><a href='/Dashboard'>Dashboards</a></li><li class='breadcrumb-item'><a href='/Product'>Product</a></li><li class='breadcrumb-item'><a href='/Product/Brand'>Brand</a></li><li class='breadcrumb-item active' aria-current='page'>New Brand</li>",
      page: "product",
      tab: "brand",
      errors: {},
      user: req.user,
    });
  },
  saveBrand: (req, res) => {
    try {
      //   validation
      req.checkBody("title", "field is required").notEmpty().trim();

      let errors = req.validationErrors();
      errors = errors ? loop.passErrData(errors) : "";

      if (errors) {
        res.render("product/createBrand", {
          breadcrumb:
            "<li class='breadcrumb-item'><a href='/Dashboard'>Dashboards</a></li><li class='breadcrumb-item'><a href='/Product'>Product</a></li><li class='breadcrumb-item'><a href='/Product/Brand'>Brand</a></li><li class='breadcrumb-item active' aria-current='page'>New Brand</li>",
          page: "product",
          tab: "brand",
          errors,
          user: req.user,
        });
      } else {
        // save data
        var Brand = new brandModel();
        Brand.title = req.body.title;
        Brand.save();
        req.flash("success", `Brand (${req.body.title}) saved!`);
        res.redirect("/Product/Brand");
      }
    } catch (error) {
      throw error;
    }
  },
  measurementList: async (req, res) => {
    var measurementList = await measurementModel.find({}).sort({ _id: -1 });
    res.render("product/measurementList", {
      measurementList,
      breadcrumb:
        "<li class='breadcrumb-item'><a href='/Dashboard'>Dashboards</a></li><li class='breadcrumb-item'><a href='/Product'>Product</a></li><li class='breadcrumb-item active' aria-current='page'>Measurement</li>",
      page: "product",
      tab: "measurement",
      user: req.user,
    });
  },
  createMeasurement: (req, res) => {
    res.render("product/createMeasurement", {
      breadcrumb:
        "<li class='breadcrumb-item'><a href='/Dashboard'>Dashboards</a></li><li class='breadcrumb-item'><a href='/Product'>Product</a></li><li class='breadcrumb-item'><a href='/Product/Measurement'>Measurement</a></li><li class='breadcrumb-item active' aria-current='page'>New Measurement</li>",
      page: "product",
      tab: "measurement",
      errors: {},
      user: req.user,
    });
  },
  saveMeasurement: (req, res) => {
    try {
      //   validation
      req.checkBody("title", "field is required").notEmpty().trim();

      let errors = req.validationErrors();
      errors = errors ? loop.passErrData(errors) : "";

      if (errors) {
        res.render("product/createMeasurement", {
          breadcrumb:
            "<li class='breadcrumb-item'><a href='/Dashboard'>Dashboards</a></li><li class='breadcrumb-item'><a href='/Product'>Product</a></li><li class='breadcrumb-item'><a href='/Product/Measurement'>Measurement</a></li><li class='breadcrumb-item active' aria-current='page'>New Measurement</li>",
          page: "product",
          tab: "measurement",
          errors,
          user: req.user,
        });
      } else {
        // save data
        var Measurement = new measurementModel();
        Measurement.title = req.body.title;
        Measurement.save();
        req.flash("success", `Measurement (${req.body.title}) saved!`);
        res.redirect("/Product/Measurement");
      }
    } catch (error) {
      throw error;
    }
  },
  productList: async (req, res) => {
    var products =
      req.user.permissions != "low"
        ? await productModel.find({}).sort({ _id: -1 })
        : await storeProductsModel.find({ storeName: req.user.storeName });
    var storeStock = await storeProductsModel.find({});

    res.render("product/index", {
      products,
      storeStock,
      breadcrumb:
        "<li class='breadcrumb-item'><a href='/Dashboard'>Dashboards</a></li><li class='breadcrumb-item active' aria-current='page'>Products</li>",
      page: "product",
      tab: "product",
      user: req.user,
    });
  },
  updateProductList: async (req, res) => {
    req
      .checkBody("purchase", "Purchase price must be between 1 to 5000")
      .notEmpty()
      .trim()
      .isFloat({ min: 1, max: 5000 });
    req
      .checkBody("retail", "Retail price must be between 1 to 5000")
      .notEmpty()
      .trim()
      .isFloat({ min: 1, max: 5000 });
    req
      .checkBody("quantity", "invalid quantity entry")
      .notEmpty()
      .trim()
      .isNumeric();
    let errors = req.validationErrors();
    errors = errors ? loop.passErrData(errors) : "";
    if (errors) {
      res.send({ status: 0, errors });
    } else {
      let { purchase, retail, quantity, id } = req.body;

      var myquery = { _id: id };
      var newvalues = {
        $set: { purchasePrice: purchase, retailPrice: retail, quantity },
      };
      await productModel.updateOne(myquery, newvalues);

      res.send({ status: 1, succMsg: "Product updated!" });
    }
  },
  createProduct: async (req, res) => {
    var brandList = await brandModel.find({}).sort({ _id: -1 });
    var categoryList = await categoryModel.find({}).sort({ _id: -1 });
    var measurementList = await measurementModel.find({}).sort({ _id: -1 });
    var productCode = await productModel.findOne().sort({ _id: -1 });

    res.render("product/new", {
      breadcrumb:
        "<li class='breadcrumb-item'><a href='/Dashboard'>Dashboards</a></li><li class='breadcrumb-item'><a href='/Products'>Products</a></li><li class='breadcrumb-item active' aria-current='page'>New Product</li>",
      page: "product",
      tab: "product",
      productCode: productCode
        ? InvoiceNumber.next(productCode.productCode)
        : InvoiceNumber.next("pro-0000"),
      brandList,
      categoryList,
      measurementList,
      user: req.user,
    });
  },
  saveProduct: async (req, res) => {
    try {
      req.checkBody("categoryList", "field is required").notEmpty().trim();
      req.checkBody("brandList", "field is required").notEmpty().trim();
      req.checkBody("measurementList", "field is required").notEmpty().trim();
      if (req.body.productDetails != "") {
        req.checkBody("productDetails", "field is required").notEmpty().trim();
      }
      let parseErrors = req.validationErrors();
      parseErrors = parseErrors ? loop.passErrData(parseErrors) : "";
      if (parseErrors) {
        res.send({ status: 0, parseErrors });
      } else {
        var product = new productModel();
        product.productCode = req.body.productCode;
        product.productName = req.body.productName;
        product.category = req.body.categoryList;
        product.brand = req.body.brandList;
        product.measurement = req.body.measurementList;
        product.productDetails = req.body.productDetails;
        product.save();
        req.flash("success", `Product (${req.body.productName}) saved!`);
        res.redirect("/Product");
      }
    } catch (error) {
      throw error;
    }
  },
  storeStock: async (req, res) => {
    var { id } = req.params;

    var product = await productModel.find({ _id: id });
    var stores = await storesModel.find();
    var storeStock = await storeProductsModel.find({
      productId: id,
    });

    res.render("product/storeStock", {
      product,
      stores,
      storeStock,
      breadcrumb:
        "<li class='breadcrumb-item'><a href='/Product'>Product</a></li><li class='breadcrumb-item active' aria-current='page'>Stock Movement</li>",
      page: "product",
      tab: "product",
      user: req.user,
    });
  },
  saveStoreStock: async (req, res) => {
    req
      .checkBody("quantity", "invalid quantity entry")
      .notEmpty()
      .trim()
      .isNumeric();
    let errors = req.validationErrors();
    errors = errors ? loop.passErrData(errors) : "";
    if (errors) {
      res.send({ status: 0, errors });
    } else {
      const {
        storeCode,
        storeName,
        quantity,
        productName,
        productCode,
        productId,
        price,
        category,
      } = req.body;
      const isValidQuantity = await productModel.findOne({ _id: productId });

      if (isValidQuantity.quantity < +quantity) {
        res.send({
          status: 0,
          errors: {
            errMsg: `Limited warehouse stock <br>( ${isValidQuantity.quantity} quantity) left`,
          },
        });
      } else {
        var isProduct = await storeProductsModel.findOne({
          storeCode,
          productId,
        });
        await productModel.updateOne(
          { _id: productId },
          { $set: { quantity: isValidQuantity.quantity - quantity } }
        );

        if (isProduct) {
          // update product store quantity
          const incCallback = await storeProductsModel.updateOne(
            { storeCode, productId },
            { $set: { quantity: +isProduct.quantity + +quantity } }
          );
        } else {
          // insert product in store\

          const newStore = new storeProductsModel({
            storeCode,
            storeName,
            quantity,
            productName,
            productCode,
            productId,
            price,
            category,
          });
          newStore.save();
        }
        res.send({ status: 1, succMsg: "Product updated" });
      }
    }
  },
};
