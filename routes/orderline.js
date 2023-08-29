var express = require('express');
var router = express.Router();
//==================================================
// Route to list all records
//==================================================

router.get('/', function(req, res, next) {
  let query = "SELECT order_line_id, order_id, book_id, quantity FROM order_line ";
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    }
    // render the view with the records
    res.render('orderline/allrecords', { allrecs: result });
  });
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================

router.get('/:recordid/show', function(req, res, next) {
  let query = "SELECT order_line_id, order_id,book_id,quantity FROM order_line WHERE order_line_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
  if (err) {
  console.log(err);
  res.render('error');
  } else {
  res.render('orderline/onerec', {onerec: result[0] });
  }
  });
  });

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================

  router.get('/addrecord', function(req,res,next){
    let query = "SELECT co.order_id, c.first_name, c.last_name FROM customer_order co INNER JOIN customer c ON co.customer_id = c.customer_id ";
    // execute query
    db.query(query, (err, result) => {
      if(err){
        console.log(err);
        res.render('error');
      }
      else
      {
        let query = "select book_id, title from book";
        // execute query
        db.query(query, (err,result2) => {
          if (err)
          {
            console.log(err);
            res.render('error');
          }
          res.render('orderline/addrec', {orders: result, book: result2});
        });
      }
    });
  });
  
  



// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {
  let insertquery = "INSERT INTO order_line (order_id, book_id, quantity) VALUES (?, ?, ?)";
  db.query(insertquery,[req.body.order_id, req.body.book_id, req.body.quantity ],(err, result) => {
  if (err) {
  console.log(err);
  res.render('error');
  } else {
  res.redirect('/orderline');
  }
  });
  });

// ==================================================
// Route to edit one specific record.
// ==================================================


router.get('/:recordid/edit', function(req, res, next) {
  let query = "SELECT order_line_id, order_id, book_id, quantity FROM order_line WHERE order_line_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
  if (err) {
  console.log(err);
  res.render('error');
  } else {
  res.render('orderline/editrec', {onerec: result[0] });
  }
  });
  });

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
  let updatequery = "UPDATE order_line SET order_id = ?, book_id = ?, quantity = ? WHERE order_line_id = " + req.body.order_line_id;
  db.query(updatequery,[req.body.order_id, req.body.book_id, req.body.quantity],(err, result) => {
  if (err) {
  console.log(err);
  res.render('error');
  } else {
  res.redirect('/orderline');
  }
  });
  });

// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
  let query = "DELETE FROM order_line WHERE order_line_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
  if (err) {
  console.log(err);
  res.render('error');
  } else {
  res.redirect('/orderline');
  }
  });
  });

module.exports = router;
