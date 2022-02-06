var express = require("express");
const {
  getPage,
  addToCart,
  attachCustomer,
  saveOrder,
  detachCustomer,
} = require("../controller/sales.controller");
var router = express.Router();

/* GET users listing. */
router.post("/SaveOrder", saveOrder);
router.get("/", getPage);
router.post("/detach", detachCustomer);
router.post("/:id", addToCart);
router.post("/attach/:id", attachCustomer);

module.exports = router;
