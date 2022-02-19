module.exports = {
  getPage: (req, res) => {
    res.render("dashboard", {
      page: "dashboard",
      tab: "dashboard",
      user: req.user,
      breadcrumb:
        "<li class='breadcrumb-item active' aria-current='page'>Dashboard</li>",
    });
  },
};
