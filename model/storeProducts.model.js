var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var storeProductSchema = new Schema({
  storeCode: { type: String },
  storeName: { type: String },
  productId: { type: String },
  productCode: { type: String },
  productName: { type: String },
  category: { type: String },
  quantity: { type: String },
  price: { type: String },
});

let storeProduct = (module.exports = mongoose.model(
  "storeProduct",
  storeProductSchema
));
