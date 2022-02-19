var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productSchema = new Schema({
  productCode: { type: String },
  productName: { type: String },
  productDetails: { type: String },
  category: { type: String },
  brand: { type: String },
  measurement: { type: String },
  purchasePrice: { type: String },
  retailPrice: { type: String },
  quantity: { type: String },
});

let Items = (module.exports = mongoose.model("product", productSchema));
