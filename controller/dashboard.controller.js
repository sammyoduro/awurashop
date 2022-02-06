module.exports = {
  getPage: (req, res) => {
    res.render("dashboard", {
      breadcrumb:
        "<li class='breadcrumb-item active' aria-current='page'>Dashboard</li>",
    });
  },
};
