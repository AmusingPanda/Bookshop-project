var express = require('express');
var router = express.Router();



/* Report menu. */
router.get('/', function(req, res, next) {
    res.render('report/reportmenu');
  });
  
  
//==================================================
// Route to list all records for customers
//==================================================
router.get('/customer', function(req, res, next) {
    let query = "SELECT customer_id, first_name, last_name, email, username FROM customer";
    // execute query
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.render('error');
      }
      // render the view with the records
      res.render('report/allcusts', { allrecs: result });
    });
  });


  //==================================================
// Route to list all records for books
//==================================================
router.get('/product', function(req, res, next) {
    let query = "SELECT book_id, title, publication_date, language_id, publisher_id, price, isbn, bookimage FROM book";
    // execute query
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.render('error');
      }
      // render the view with the records
      res.render('report/allprods', { allrecs: result });
    });
  });


//==================================================
// Route to list all records for customer home address
//==================================================
router.get('/add', function(req, res, next) {
    let query = "SELECT address_id, street_number, street_name, city, state, postal_code, country_id, customer_id FROM address";
    // execute query
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.render('error');
      }
      // render the view with the records
      res.render('report/alladds', { allrecs: result });
    });
  });
  

//==================================================
// Route to list all records for orders
//==================================================
  router.get('/orders', function(req, res, next) {
    let query = "SELECT order_id, customer_id, order_date, shipping_method_id FROM customer_order";
    // execute query
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.render('error');
      }
      // render the view with the records
      res.render('report/allorders', { allrecs: result });
    });
  });
  

//==================================================
// Route to list all history order records
//==================================================
router.get('/history', function(req, res, next) {
    let query = "SELECT history_id, order_id, status_id, update_date FROM order_history";
    // execute query
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.render('error');
      }
      // render the view with the records
      res.render('report/allhistory', { allrecs: result });
    });
  });



//==================================================
// Route to list all order line records
//==================================================
router.get('/line', function(req, res, next) {
    let query = "SELECT order_line_id, order_id, book_id, quantity FROM order_line";
    // execute query
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.render('error');
      }
      // render the view with the records
      res.render('report/allline', { allrecs: result });
    });
  })
  

module.exports = router;
