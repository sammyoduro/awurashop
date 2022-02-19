const bcrypt = require("bcrypt-nodejs");
const generator = require("generate-password");
const loop = require("../helpers/loop");
const userModel = require("../model/user");
const storeModel = require("../model/stores");
module.exports = {
  List: async (req, res) => {
    const users = await userModel.find();

    res.render("users/list", {
      page: "users",
      tab: "users",
      users,
      user: req.user,
    });
  },
  NewUser: async (req, res) => {
    const stores = await storeModel.find();
    res.render("users/new", {
      page: "users",
      tab: "users",
      stores,
      inputs: {},
      errors: {},
      user: req.user,
    });
  },
  saveUser: async (req, res) => {
    const { firstName, lastName, username, phone, permissions, store } =
      req.body;
    const stores = await storeModel.find();

    req.checkBody("firstName", "field is required").notEmpty().trim();
    req.checkBody("lastName", "field is required").notEmpty().trim();
    req.checkBody("username", "field is required").notEmpty().trim();
    req.checkBody("phone", "field is required").notEmpty().trim();
    if (req.body.permissions == "low") {
      req.checkBody("store", "field is required").notEmpty().trim();
    }
    let errors = req.validationErrors();
    errors = errors ? loop.passErrData(errors) : "";

    if (errors) {
      res.render("users/new", {
        page: "users",
        tab: "users",
        user: req.user,
        errors,
        stores,
        inputs: { firstName, lastName, username, phone, permissions, store },
      });
    } else {
      var user = await userModel.find({ username });
      if (user.length < 1) {
        var password = generator.generate({
          length: 8,
          numbers: true,
        });
        var hashpwrd = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
        var newuser = new userModel({
          firstName,
          lastName,
          username: String(username).toLowerCase(),
          phone,
          permissions,
          password: hashpwrd,
          storeName: store,
          createdAt: new Date(),
        });
        newuser.save();
        req.flash(
          "success",
          `User created successfully!  \n Details: \n Username: ${username} \n Password: \n ${password}`
        );
        res.redirect("/Users");
      } else {
        res.render("users/new", {
          page: "users",
          tab: "users",
          user: req.user,
          stores,
          inputs: { firstName, lastName, username, phone, permissions },
          errors: {
            username: "username already associated with another account",
          },
        });
      }
    }
  },
  userDetails: async (req, res) => {
    const { id } = req.params;
    const userDetails = await userModel.findOne({ _id: id });

    res.render("users/userDetails", {
      page: "users",
      tab: "users",
      user: req.user,
      userDetails,
    });
  },
};
