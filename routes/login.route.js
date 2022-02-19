var express = require("express");
var passport = require("passport");
var router = express.Router();

const { getPage, login } = require("../controller/login.controller");

/* GET users listing. */
router.get("/", getPage);
router.post(
  "/",
  passport.authenticate("local.signin", {
    failureRedirect: "/",
    failureFlash: true,
  }),
  function (req, res, next) {
    switch (req.user.permissions) {
      case "low":
        res.redirect("/Sales");
        break;

      default:
        res.redirect("/Dashboard");
        break;
    }
  }
);

module.exports = router;
