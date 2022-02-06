var createError = require("http-errors");
var express = require("express");
var path = require("path");
const mongoose = require("mongoose");
const expressValidator = require("express-validator");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var loginRouter = require("./routes/login.route");
var dashboardRouter = require("./routes/dashboard.route");
var storeRouter = require("./routes/stores.route");
var salesRouter = require("./routes/sales.route");
var categoryRouter = require("./routes/category.route");
var productsRouter = require("./routes/products.route");
var customersRouter = require("./routes/customers.route");
var historyRouter = require("./routes/history.route");
const connectDB = require("./DB/connection");
connectDB();
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(expressValidator());
app.use(express.urlencoded({ extended: false }));
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
// app.use(passport.initialize());
// app.use(passport.session());

app.use("/", loginRouter);
app.use("/Dashboard", dashboardRouter);
app.use("/Stores", storeRouter);
app.use("/Sales", salesRouter);
app.use("/Categories", categoryRouter);
app.use("/Products", productsRouter);
app.use("/Customers", customersRouter);
app.use("/History", historyRouter);

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
