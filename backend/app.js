// Import necessary modules
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require("body-parser");
const cors = require("cors");

// Routes
// 1. Admin routes
const adminAuthRoutes = require("./routes/admin/auth_routes");
const adminProdRoutes = require("./routes/admin/product_routes");
const adminUserRoutes = require("./routes/admin/user_routes");

// 2. General routes
const generalAuthRoutes = require("./routes/general/auth_routes");
const generalProdRoutes = require("./routes/general/product_routes");

// 3. Log routes
const logRoutes = require("./routes/log/log_routes");

// Create Express application
var app = express();

// Set up middleware
app.use(logger('dev')); // Logger middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: false })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse Cookie headers
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Body parser and CORS middleware
app.use(bodyParser.json());
app.use(cors());

// Mount routes
app.use("/admin/auth", adminAuthRoutes);
app.use("/admin/product", adminProdRoutes);
app.use("/admin/user", adminUserRoutes);

app.use("/general/auth", generalAuthRoutes);
app.use("/general/product", generalProdRoutes);

app.use("/log", logRoutes);

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Routes for index and users
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
