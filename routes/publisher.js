var express = require('express');
var router = express.Router();
//==================================================
// Route to list all records
//==================================================

router.get('/', function(req, res, next) {
  let query = "SELECT publisher_id, publisher_name FROM publisher";
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    }
    // render the view with the records
    res.render('publisher/allrecords', { allrecs: result });
  });
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================

router.get('/:recordid/show', function(req, res, next) {
  let query = "SELECT publisher_id, publisher_name FROM publisher WHERE publisher_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
  if (err) {
  console.log(err);
  res.render('error');
  } else {
  res.render('publisher/onerec', {onerec: result[0] });
  }
  });
  });

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function(req, res, next) {
  res.render('publisher/addrec');
  });




// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {
  let insertquery = "INSERT INTO publisher (publisher_name) VALUES (?)";
  db.query(insertquery,[req.body.publisher_name],(err, result) => {
  if (err) {
  console.log(err);
  res.render('error');
  } else {
  res.redirect('/publisher');
  }
  });
  });

// ==================================================
// Route to edit one specific record.
// ==================================================


router.get('/:recordid/edit', function(req, res, next) {
  let query = "SELECT publisher_id, publisher_name FROM publisher WHERE publisher_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
  if (err) {
  console.log(err);
  res.render('error');
  } else {
  res.render('publisher/editrec', {onerec: result[0] });
  }
  });
  });

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
  let updatequery = "UPDATE publisher SET publisher_name = ? WHERE publisher_id = " + req.body.publisher_id;
  db.query(updatequery,[req.body.publisher_name],(err, result) => {
  if (err) {
  console.log(err);
  res.render('error');
  } else {
  res.redirect('/publisher');
  }
  });
  });

// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
  let query = "DELETE FROM publisher WHERE publisher_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
  if (err) {
  console.log(err);
  res.render('error');
  } else {
  res.redirect('/publisher');
  }
  });
  });


module.exports = router;
