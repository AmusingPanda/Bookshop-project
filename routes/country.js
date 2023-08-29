var express = require('express');
var router = express.Router();
//==================================================
// Route to list all records
//==================================================
router.get('/', function(req, res, next) {
  let query = "SELECT country_id, country_name FROM country";
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    }
    // render the view with the records
    res.render('country/allrecords', { allrecs: result });
  });
});


// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
    let query = "SELECT country_id, country_name FROM country WHERE country_id = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.render('country/onerec', {onerec: result[0] });
    }
    });
    });



// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function(req, res, next) {
  res.render('country/addrec');
  });


// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {
  let insertquery = "INSERT INTO country (country_name) VALUES (?)";
  db.query(insertquery,[req.body.country_name],(err, result) => {
  if (err) {
  console.log(err);
  res.render('error');
  } else {
  res.redirect('/country');
  }
  });
  });

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
  let query = "SELECT country_id, country_name FROM country WHERE country_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
  if (err) {
  console.log(err);
  res.render('error');
  } else {
  res.render('country/editrec', {onerec: result[0] });
  }
  });
  });


// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
  let updatequery = "UPDATE country SET country_name = ? WHERE country_id = " + req.body.country_id;
  db.query(updatequery,[req.body.country_name],(err, result) => {
  if (err) {
  console.log(err);
  res.render('error');
  } else {
  res.redirect('/country');
  }
  });
  });

  // ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
  let query = "DELETE FROM country WHERE country_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
  if (err) {
  console.log(err);
  res.render('error');
  } else {
  res.redirect('/country');
  }
  });
  });


module.exports = router;
