module.exports = function isLoggedIn(req, res, next) {
  if (req.user) {
    next();
  } else {
    req.session.oldUrl = req.originalUrl;

    // return unauthorized
    req.session.RegisterStatus = {
      status: true,
      type: "alert-info",
      message: "please login before you can purchase successfully!",
    };
    res.redirect("/Account/Signin");
  }
};
