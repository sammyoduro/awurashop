var express = require("express");
const { getPage } = require("../controller/dashboard.controller");
var router = express.Router();

/* GET users listing. */
router.get("/", getPage);

module.exports = router;
