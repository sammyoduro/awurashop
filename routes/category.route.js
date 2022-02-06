var express = require("express");
const {
  getPage,
  getNewCat,
  createNewCat,
} = require("../controller/category.controller");
var router = express.Router();

/* GET users listing. */
router.get("/", getPage);
router.get("/New", getNewCat);
router.post("/New", createNewCat);
module.exports = router;
