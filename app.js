var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var layouts = require('express-ejs-layouts');
var dotenv = require('dotenv');
dotenv.config();
const session = require("express-session");

// Database connection
const mariadb = require('mariadb/callback');
//uses the dotenv package to get the database connection details from the .env file
const db = mariadb.createConnection({host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_DATABASE,
port: process.env.DB_PORT});
// checks for connection errors with the database
db.connect((err) => {
  if (err) {
       console.log("Unable to connect to database due to error: " + err);} 
//checks for successful connection to the database      
else
  {
  console.log("Connected to DB");
  }
});
global.db = db;

// variables for the routes files to be used in the app.js file
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/about');
var contactRouter = require('./routes/contact');
var privacyRouter = require('./routes/privacy');
var helpRouter = require('./routes/help');
var countryRouter = require('./routes/country');
var customerRouter = require('./routes/customer');
var addressRouter = require('./routes/address');
var booklanguageRouter = require('./routes/booklanguage');
var publisherRouter = require('./routes/publisher');
var authorRouter = require('./routes/author');
var shippingmethodRouter = require('./routes/shippingmethod');
var bookRouter = require('./routes/book');
var customerorderRouter = require('./routes/customerorder');
var orderhistoryRouter = require('./routes/orderhistory');
var orderlineRouter = require('./routes/orderline');
var orderstatusRouter = require('./routes/orderstatus');
var reviewRouter = require('./routes/review');
var searchRouter = require('./routes/search');
var reportRouter = require('./routes/report');
var catalogRouter = require("./routes/catalog");
var bookauthorRouter = require("./routes/bookauthor");
var registerRouter = require("./routes/register");
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ secret: "BookSecret" }));
app.use(function (req, res, next) {
  res.locals.session = req.session;
  next();
});

app.use(layouts);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter);
app.use('/privacy', privacyRouter);
app.use('/help', helpRouter);
app.use('/country', countryRouter);
app.use('/customer', customerRouter);
app.use('/address', addressRouter);
app.use('/booklanguage', booklanguageRouter);
app.use('/publisher', publisherRouter);
app.use('/author', authorRouter);
app.use('/shippingmethod', shippingmethodRouter);
app.use('/book', bookRouter);
app.use('/customerorder', customerorderRouter);
app.use('/orderhistory', orderhistoryRouter);
app.use('/orderline', orderlineRouter);
app.use('/orderstatus', orderstatusRouter);
app.use('/review', reviewRouter);
app.use('/search', searchRouter);
app.use('/report', reportRouter);
app.use("/catalog", catalogRouter);
app.use("/bookauthor", bookauthorRouter);
app.use("/register", registerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
