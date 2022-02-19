const upload_dummy = require("../helpers/upload_dummy");

module.exports = {
  list: (req, res) => {
    res.render("stock/list", {
      breadcrumb:
        "<li class='breadcrumb-item active' aria-current='page'>Stock Movement</li>",
      page: "stock",
      tab: "stock",
      user: req.user,
    });
  },
  addStock: (req, res) => {
    res.render("stock/add", {
      breadcrumb:
        "<li class='breadcrumb-item'><a href='/Stock-movement'>Stock Movement</a></li><li class='breadcrumb-item active' aria-current='page'>Add</li>",
      page: "stock",
      tab: "stock",
      user: req.user,
    });
  },
  saveStock: async (req, res) => {
    await upload_dummy(req, res);

    res.send({ status: 1, succMsg: "Done" });
  },
};
