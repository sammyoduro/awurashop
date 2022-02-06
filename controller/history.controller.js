const Cart = require("../model/cart.model");
const salesModel = require("../model/sales.model");

module.exports = {
  getPage: async (req, res) => {
    const sales = await salesModel.find().sort({ _id: -1 });

    res.render("history/index", {
      sales,
      breadcrumb:
        "<li class='breadcrumb-item'><a href='/Dashboard'>Dashboards</a></li><li class='breadcrumb-item active' aria-current='page'>History</li>",
    });
  },
  viewInvoice: async (req, res) => {
    const { id } = req.params;
    const sales = await salesModel.findOne({ id }).sort({ _id: -1 });
    const cart = new Cart(sales.cart);

    res.render("history/invoice", {
      sales,
      cart,
      breadcrumb:
        "<li class='breadcrumb-item'><a href='/Dashboard'>Dashboards</a></li><li class='breadcrumb-item'><a href='/History'>History</a></li><li class='breadcrumb-item active' aria-current='page'>Invoice</li>",
    });
  },
};
