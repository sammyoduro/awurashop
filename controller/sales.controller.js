const { InvoiceNumber } = require("invoice-number");
const Cart = require("../model/cart.model");
const discountModel = require("../model/discount.model");
const Sales = require("../model/sales.model");
const Product = require("../model/product.model");
const customersModel = require("../model/customers.model");
const { json } = require("express");
module.exports = {
  getPage: async (req, res) => {
    const productSample = await Product.find();
    const customers = await customersModel.find();
    // var discount = await getDiscount();
    var discount = { limit: 200, discountRate: 15 };
    var inv = await Sales.findOne().sort({ _id: -1 });
    const cart = new Cart(req.session.cart || 0);
    res.render("sales/index", {
      breadcrumb:
        "<li class='breadcrumb-item'><a href='/Dashboard'>Dashboards</a></li><li class='breadcrumb-item active' aria-current='page'>Sales</li>",
      page: "newsales",
      InvoiceNumber: inv
        ? InvoiceNumber.next(inv.recieptNumber)
        : InvoiceNumber.next("000000000000000"),
      cart: cart.generateArray(),
      subCart: cart,
      productSample: productSample,
      customers,
      selectedCustomer: req.session.customer || null,
      // sample: JSON.stringify(productSample),
      discount,
    });
  },
  addToCart: async (req, res) => {
    const { id } = req.params;
    const cart = new Cart(req.session.cart ? req.session.cart : { items: {} });
    const product = await Product.findOne({ _id: id });
    cart.add(product, product.id);
    req.session.cart = cart;
    console.log(product);
    res.send({ status: 1, succMsg: `${product.itemName} added!` });
  },
  attachCustomer: async (req, res) => {
    const { id } = req.params;

    var selectedCustomer = await Sales.findOne({ customerId: id }).sort({
      _id: -1,
    });

    var customer = await customersModel.findOne({ id });
    customer = {
      id,
      name: customer.customerName,
      phone: customer.phone,
      date:
        new Date(selectedCustomer.createdAt).toLocaleDateString() +
        " @ " +
        new Date(selectedCustomer.createdAt).toLocaleTimeString(),
      payment:
        selectedCustomer.paymentMethod +
        ": " +
        selectedCustomer.customerPayment,
      itemPurchased: selectedCustomer.cart.totalQty,
      balance: selectedCustomer ? selectedCustomer.customerBalance : 0.0,
    };
    req.session.customer = customer;
    res.send({ status: 1 });
  },
  saveOrder: async (req, res) => {
    try {
      const cart = new Cart(req.session.cart || 0);
      var Orders = cart.generateArray();

      var counter = 0;
      var done = false;
      var parseCalback = await new Promise((resolve) => {
        Orders.map(async (order) => {
          var callback = await Product.find({ _id: order.item._id });
          if (order.item._id == callback[0].id) {
            var newStock = callback[0].stock - order.qty;
            await Product.updateMany(
              { _id: callback[0].id },
              { $set: { stock: newStock } }
            );
            counter++;
            if (counter == Orders.length) {
              done = true;
              resolve(done);
            }
          }
        });
      });
      const {
        customerName,
        customerPhone,
        customerId,
        InvoiceNumber,
        paid,
        paymentMethod,
        chequeBox,
        comment,
        checkcomment,
      } = req.body;

      if (parseCalback == true) {
        var discount = await getDiscount();

        discount = !discount ? 0 : discount.discountRate / 100;

        var order = new Sales({
          customerId,
          customer: { name: customerName, phone: customerPhone },
          cart,
          orderPrice: cart.totalPrice,
          customerBalance: (
            cart.totalPrice -
            cart.totalPrice * discount -
            paid
          ).toFixed(2),
          customerPayment: paid,
          discount,
          issuer: "Precious Appiah",
          recieptNumber: InvoiceNumber,
          chequeNumber: checkcomment ? chequeBox : "",
          paymentMethod,
          comment,
          checkcomment,
        });
        await order.save();
        req.session.cart = null;
        req.session.customer = null;
        res.send({ status: 1, succMsg: "Done", cart: Orders, sales: order });
      }
    } catch (error) {
      throw error;
    }
  },
  detachCustomer: async (req, res) => {
    req.session.customer = null;
    res.send({ status: 1 });
  },
};
function getDiscount() {
  return new Promise(async (resolve) => {
    // var discount = await discountModel.findOne().sort({ _id: -1 });
    // var today = new Date().getTime();
    // var dif = discount ? new Date(discount.startAt).getTime() - today : false;
    // discount = dif && dif <= 0 ? discount : false;
    // resolve(discount);
    var discount = { limit: 200, discountRate: 15 };
    resolve(discount);
  });
}
