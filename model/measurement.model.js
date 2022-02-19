//--------------------------Mongodb collection where tokens are stored till they are verified--------------------------//
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var measurementSchema = new Schema({
  title: { type: String },
});

module.exports = mongoose.model("measurement", measurementSchema);
