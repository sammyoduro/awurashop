const loop = require("../helpers/loop");
const customersModel = require("../model/customers.model");

module.exports = {
  getPage: async (req, res) => {
    const customers = await customersModel.find().sort({ _id: -1 });
    res.render("customers/index", {
      breadcrumb:
        "<li class='breadcrumb-item'><a href='/Dashboard'>Dashboards</a></li><li class='breadcrumb-item active' aria-current='page'>Customers</li>",
      customers,
    });
  },
  newCustomer: async (req, res) => {
    res.render("customers/new", {
      breadcrumb:
        "<li class='breadcrumb-item'><a href='/Dashboard'>Dashboards</a></li><li class='breadcrumb-item'><a href='/Customers'>Customers</a></li><li class='breadcrumb-item active' aria-current='page'>New Customer</li>",
    });
  },
  saveCustomer: async (req, res) => {
    try {
      const { customerName, phone } = req.body;
      //   validation
      req.checkBody("customerName", "field is required").notEmpty().trim();
      if (req.body.description != "") {
        req.checkBody("phone", "field is required").notEmpty().trim();
      }
      let parseErrors = req.validationErrors();
      parseErrors = parseErrors ? loop.passErrData(parseErrors) : "";
      if (parseErrors) {
        res.send({ status: 0, parseErrors });
      } else {
        const customer = new customersModel();
        customer.customerName = customerName;
        customer.phone = phone;
        customer.save();

        res.json({
          status: 1,
          succMsg: `Category (${customerName}) saved!`,
        });
        res.end();
      }
    } catch (error) {
      throw error;
    }
  },
};
