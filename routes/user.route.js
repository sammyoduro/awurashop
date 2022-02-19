var express = require("express");
const {
  List,
  NewUser,
  saveUser,
  userDetails,
} = require("../controller/user.controller");
var router = express.Router();

router.get("/", List);
router.get("/New", NewUser);
router.post("/New", saveUser);
router.get("/details/:id", userDetails);

module.exports = router;
