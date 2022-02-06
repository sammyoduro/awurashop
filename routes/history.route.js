var express = require("express");
const { getPage, viewInvoice } = require("../controller/history.controller");
var router = express.Router();

/* GET users listing. */
router.get("/", getPage);
router.get("/view-invoice/:id", viewInvoice);

module.exports = router;
