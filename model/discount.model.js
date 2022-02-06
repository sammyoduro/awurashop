//--------------------------Mongodb collection where tokens are stored till they are verified--------------------------//
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var discountSchema = new Schema({
  discountRate: { type: String },
  limit: { type: String },
  startAt: { type: Date, required: true },
  endAt: { type: Date, required: true, expires: 1800 },
});

module.exports = mongoose.model("discount", discountSchema);
