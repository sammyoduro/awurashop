var express = require("express");
const {
  getPage,
  newCustomer,
  saveCustomer,
  attachCustomer,
} = require("../controller/customers.controller");
var router = express.Router();

/* GET users listing. */
router.get("/", getPage);
router.get("/New", newCustomer);
router.post("/New", saveCustomer);

module.exports = router;
