var createError = require("http-errors");
var express = require("express");
var path = require("path");
const mongoose = require("mongoose");
const expressValidator = require("express-validator");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
var cookieParser = require("cookie-parser");
const passport = require("passport");
var logger = require("morgan");

var loginRouter = require("./routes/login.route");
var dashboardRouter = require("./routes/dashboard.route");
var storeRouter = require("./routes/stores.route");
var salesRouter = require("./routes/sales.route");
var productsRouter = require("./routes/products.route");
var customersRouter = require("./routes/customers.route");
var historyRouter = require("./routes/history.route");
var userRouter = require("./routes/user.route");
var stockRouter = require("./routes/stockMovement.route");
const connectDB = require("./DB/connection");
connectDB();
var app = express();
require("./config/passport");
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(expressValidator());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
const oneDay = 1000 * 60 * 60 * 24;
app.use(
  session({
    secret: "Tikam Wood Shop",
    name: "key",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { maxAge: oneDay },
  })
);
// Express messages middleware
app.use(require("connect-flash")());
app.use(passport.initialize());
app.use(passport.session());

// error handler
app.use(function (req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  // res.locals.user = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});

app.use("/", loginRouter);
app.use("/Dashboard", dashboardRouter);
app.use("/Stores", storeRouter);
app.use("/Sales", salesRouter);
app.use("/Product", productsRouter);
app.use("/Customers", customersRouter);
app.use("/History", historyRouter);
app.use("/Stock-movement", stockRouter);
app.use("/Users", userRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
