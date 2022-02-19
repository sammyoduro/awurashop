//--------------------------Mongodb collection where tokens are stored till they are verified--------------------------//
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var brandSchema = new Schema({
  title: { type: String },
});

module.exports = mongoose.model("brand", brandSchema);
