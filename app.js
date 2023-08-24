var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var layouts = require('express-ejs-layouts'); // add this line
var dotenv = require('dotenv');
dotenv.config();

// database connection
const mariadb = require('mariadb/callback');
//gets the database connection details from the .env file
const db = mariadb.createConnection({host: process.env.DB_HOST,
user: process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_DATABASE,
port: process.env.DB_PORT});


// connect to database
db.connect((err) => {
  if (err) {
      // when the database connection fails
    console.log("Unable to connect to database due to error: " + err);
  } else {
      // when the database connection is successful
    console.log("Connected to DB");
  }
});

// make the database connection available to the rest of the application
global.db = db;




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const aboutRouter = require('./routes/about');
const contactRouter = require('./routes/contact');
const helpRouter = require('./routes/help');
const privacyRouter = require('./routes/privacy');
const booksRouter = require('./routes/books'); // add this line
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts); // 




app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/contact', contactRouter); // includes the new route
app.use('/help', helpRouter); // includes the new route
app.use('/privacy', privacyRouter); // includes the new route
app.use('/books', booksRouter); // includes the new route 

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
