var express = require("express");
const { getPage } = require("../controller/login.controller");
var router = express.Router();

/* GET users listing. */
router.get("/", getPage);

module.exports = router;
