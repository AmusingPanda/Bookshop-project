var express = require('express');
var router = express.Router();
//==================================================
// Route to list all records
//==================================================

router.get('/', function(req, res, next) {
  let query = "SELECT language_id, language_name FROM book_language";
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    }
    // render the view with the records
    res.render('booklanguage/allrecords', { allrecs: result });
  });
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================

router.get('/:recordid/show', function(req, res, next) {
  let query = "SELECT language_id, language_name FROM book_language WHERE language_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
  if (err) {
  console.log(err);
  res.render('error');
  } else {
  res.render('booklanguage/onerec', {onerec: result[0] });
  }
  });
  });

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function(req, res, next) {
  res.render('booklanguage/addrec');
  });




// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {
  let insertquery = "INSERT INTO book_language (language_name) VALUES (?)";
  db.query(insertquery,[req.body.language_name],(err, result) => {
  if (err) {
  console.log(err);
  res.render('error');
  } else {
  res.redirect('/booklanguage');
  }
  });
  });

// ==================================================
// Route to edit one specific record.
// ==================================================


router.get('/:recordid/edit', function(req, res, next) {
  let query = "SELECT language_id, language_name FROM book_language WHERE language_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
  if (err) {
  console.log(err);
  res.render('error');
  } else {
  res.render('booklanguage/editrec', {onerec: result[0] });
  }
  });
  });

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
  let updatequery = "UPDATE book_language SET language_name = ? WHERE language_id = " + req.body.language_id;
  db.query(updatequery,[req.body.language_name],(err, result) => {
  if (err) {
  console.log(err);
  res.render('error');
  } else {
  res.redirect('/booklanguage');
  }
  });
  });

// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
  let query = "DELETE FROM book_language WHERE language_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
  if (err) {
  console.log(err);
  res.render('error');
  } else {
  res.redirect('/booklanguage');
  }
  });
  });

module.exports = router;
