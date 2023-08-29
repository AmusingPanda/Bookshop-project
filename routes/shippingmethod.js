var express = require('express');
var router = express.Router();
//==================================================
// Route to list all records
//==================================================
router.get('/', function(req, res, next) {
  let query = "SELECT shipping_method_id, shipping_method_name FROM shipping_method";
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    }
    // render the view with the records
    res.render('shippingmethod/allrecords', { allrecs: result });
  });
});


// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
    let query = "SELECT shipping_method_id, shipping_method_name FROM shipping_method WHERE shipping_method_id = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.render('shippingmethod/onerec', {onerec: result[0] });
    }
    });
    });



// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function(req, res, next) {
  res.render('shippingmethod/addrec');
  });


// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {
  let insertquery = "INSERT INTO shipping_method (shipping_method_name) VALUES (?)";
  db.query(insertquery,[req.body.shipping_method_name],(err, result) => {
  if (err) {
  console.log(err);
  res.render('error');
  } else {
  res.redirect('/shippingmethod');
  }
  });
  });

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
  let query = "SELECT shipping_method_id, shipping_method_name FROM shipping_method WHERE shipping_method_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
  if (err) {
  console.log(err);
  res.render('error');
  } else {
  res.render('shippingmethod/editrec', {onerec: result[0] });
  }
  });
  });


// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
  let updatequery = "UPDATE shipping_method SET shipping_method_name = ? WHERE shipping_method_id = " + req.body.shipping_method_id;
  db.query(updatequery,[req.body.shipping_method_name],(err, result) => {
  if (err) {
  console.log(err);
  res.render('error');
  } else {
  res.redirect('/shippingmethod');
  }
  });
  });

  // ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
  let query = "DELETE FROM shipping_method WHERE shipping_method_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
  if (err) {
  console.log(err);
  res.render('error');
  } else {
  res.redirect('/shippingmethod');
  }
  });
  });


module.exports = router;
