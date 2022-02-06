const loop = require("../helpers/loop");
const storesModel = require("../model/stores");

module.exports = {
  getPage: async (req, res) => {
    var storeList = await storesModel.find().sort({ _id: -1 });
    res.render("stores/index", {
      breadcrumb:
        "<li class='breadcrumb-item'><a href='/Dashboard'>Dashboards</a></li><li class='breadcrumb-item active' aria-current='page'>Stores</li>",
      storeList,
    });
  },
  createStore: (req, res) => {
    res.render("stores/new", {
      breadcrumb:
        "<li class='breadcrumb-item'><a href='/Dashboard'>Dashboards</a></li><li class='breadcrumb-item'><a href='/Stores'>Stores</a></li><li class='breadcrumb-item active' aria-current='page'>New Store</li>",
    });
  },
  saveStore: (req, res) => {
    try {
      req.checkBody("storeName", "field is required").notEmpty().trim();
      req.checkBody("storeCode", "field is required").notEmpty().trim();
      req.checkBody("storePhone", "field is required").notEmpty().trim();
      req.checkBody("storeAddress", "field is require").notEmpty().trim();
      let parseErrors = req.validationErrors();
      parseErrors = parseErrors ? loop.passErrData(parseErrors) : "";
      if (parseErrors) {
        res.send({ status: 0, parseErrors });
      } else {
        var stores = new storesModel();
        stores.storeName = req.body.storeName;
        stores.storeCode = req.body.storeCode;
        stores.storePhone = req.body.storePhone;
        stores.storeAddress = req.body.storeAddress;
        stores.save();
        res.send({
          status: 1,
          succMsg: `Category (${req.body.storeName}) saved!`,
        });
      }
    } catch (error) {
      throw error;
    }
  },
};
