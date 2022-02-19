var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var bcrypt = require("bcrypt-nodejs");

var userSchema = new Schema({
  storeId: { type: mongoose.Schema.Types.ObjectId, ref: "store" },
  storeName: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String, unique: true },
  phone: { type: String },
  permissions: { type: String, default: "low" },
  status: { type: String, default: "offline" },
  isBlocked: { type: String, default: false },
  password: { type: String },
  loginAt: { type: Date },
  logoutAt: { type: Date },
  updatedAt: { type: Date },
  createdAt: { type: Date },
});

userSchema.methods.encryptPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
