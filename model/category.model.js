//--------------------------Mongodb collection where tokens are stored till they are verified--------------------------//
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var categorySchema = new Schema({
  title: { type: String },
  description: { type: String },
});

module.exports = mongoose.model("category", categorySchema);
