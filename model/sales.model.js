var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var schema = new Schema({
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "customer" },
  customer: { type: Object },
  cart: { type: Object },
  orderPrice: { type: Object },
  customerBalance: { type: String },
  customerPayment: { type: String },
  discount: { type: String },
  issuer: { type: Object },
  recieptNumber: { type: String },
  chequeNumber: { type: String },
  paymentMethod: { type: String },
  comment: { type: String },
  checkcomment: { type: Boolean, default: false },
  deleted: { type: Boolean, default: false },
  updatedAt: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("sales", schema);
