var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productSchema = new Schema({
  companyName: { type: String },
  branch: { type: Object },
  itemName: { type: String },
  category: { type: Object },
  imagePath: { type: Array, default: [] },
  description: { type: String },
  detailed_description: { type: String },
  salePrice: { type: String },
  purchasePrice: { type: String },
  stock: { type: Number },
  rate: { type: String },
});

let Items = (module.exports = mongoose.model("product", productSchema));
