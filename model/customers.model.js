//--------------------------Mongodb collection where tokens are stored till they are verified--------------------------//
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var customersSchema = new Schema({
  customerName: { type: String },
  phone: { type: String },
  discount: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("customers", customersSchema);
