const Cart = require("../model/cart.model");
const salesModel = require("../model/sales.model");

module.exports = {
  getPage: async (req, res) => {
    const sales = await salesModel.find().sort({ _id: -1 });

    res.render("history/index", {
      sales,
      page: "history",
      user: req.user,
    });
  },
  viewInvoice: async (req, res) => {
    const { id } = req.params;
    const sales = await salesModel.findOne({ id }).sort({ _id: -1 });
    const cart = new Cart(sales.cart);

    res.render("history/invoice", {
      sales,
      cart,
      page: "history",
      user: req.user,
    });
  },
};
