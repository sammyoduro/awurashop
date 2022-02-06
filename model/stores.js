//--------------------------Mongodb collection where tokens are stored till they are verified--------------------------//
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var storeSchema = new Schema({
  storeName: { type: String },
  storeCode: { type: String },
  storePhone: { type: String },
  storeAddress: { type: String },
});

module.exports = mongoose.model("store", storeSchema);
