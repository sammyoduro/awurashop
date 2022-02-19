var express = require("express");
const {
  list,
  addStock,
  saveStock,
} = require("../controller/stockMovement.controller");
var router = express.Router();

/* GET users listing. */
router.get("/", list);
router.get("/Add", addStock);
router.post("/Add", saveStock);

module.exports = router;
