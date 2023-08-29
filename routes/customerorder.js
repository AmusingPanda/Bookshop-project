var express = require('express');
var router = express.Router();
//==================================================
// Route to list all records
//==================================================
router.get('/', function(req, res, next) {
  let query = "SELECT order_id, customer_id, order_date, shipping_method_id FROM customer_order";
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    }
    // render the view with the records
    res.render('customerorder/allrecords', { allrecs: result });
  });
});



// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
  let query = "SELECT order_id, customer_id, order_date, shipping_method_id FROM customer_order WHERE order_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
      if (err) {
          console.log(err);
          res.render('error');
      } else {
          res.render('customerorder/onerec', { onerec: result[0] });
      }
  });
});



// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================

  router.get('/addrecord', function(req,res,next){
    let query = "select customer_id, first_name, last_name from customer";
    // execute query
    db.query(query, (err, result) => {
      if(err){
        console.log(err);
        res.render('error');
      }
      else
      {
        let query = "select shipping_method_id, shipping_method_name from shipping_method";
        // execute query
        db.query(query, (err,result2) => {
          if (err)
          {
            console.log(err);
            res.render('error');
          }
          res.render('customerorder/addrec', {customer: result, shipping: result2});
        });
      }
    });
  });
// ==================================================
// Route to obtain user input and save in database.
// ==================================================

router.post('/', function(req, res, next) {
  let insertquery = "INSERT INTO customer_order (customer_id, order_date, shipping_method_id) VALUES (?, ?, ?)";
  db.query(insertquery, [req.body.customer_id, req.body.order_date, req.body.shipping_method_id], (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      res.redirect('/customerorder');
    }
  });
});

// ==================================================
// Route to edit one specific record.
// ==================================================

router.get('/:recordid/edit', function(req, res, next) {
  let query = "SELECT order_id, customer_id, order_date, shipping_method_id FROM customer_order WHERE order_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      res.render('customerorder/editrec', {onerec: result[0] });
    }
  });
});

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
  let updatequery = "UPDATE customer_order SET customer_id = ?, order_date = ?, shipping_method_id = ? WHERE order_id = " + req.body.order_id;
  db.query(updatequery,[req.body.customer_id, req.body.order_date, req.body.shipping_method_id],(err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      res.redirect('/customerorder');
    }
  });
});

// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
  let query = "DELETE FROM customer_order WHERE order_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      res.redirect('/customerorder');
    }
  });
});


module.exports = router;
