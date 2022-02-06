var express = require("express");
const {
  getPage,
  createStore,
  saveStore,
} = require("../controller/stores.controller");
var router = express.Router();

/* GET users listing. */
router.get("/", getPage);
router.get("/New", createStore);
router.post("/New", saveStore);

module.exports = router;
