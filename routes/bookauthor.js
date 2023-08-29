var express = require('express');
var router = express.Router();
//==================================================
// Route to list all records
//==================================================

router.get('/', function(req, res, next) {
  let query = "SELECT book_id, author_id FROM book_author";
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    }
    // render the view with the records
    res.render('bookauthor/allrecords', { allrecs: result });
  });
});

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================

router.get('/:recordid/show', function(req, res, next) {
  let query = "SELECT book_id, author_id FROM book_author WHERE book_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
  if (err) {
  console.log(err);
  res.render('error');
  } else {
  res.render('bookauthor/onerec', {onerec: result[0] });
  }
  });
  });

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function(req, res, next) {
  res.render('bookauthor/addrec');
  });




// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {
  let insertquery = "INSERT INTO book_author (book_id, author_id) VALUES (?, ?)";
  db.query(insertquery,[req.body.book_id, req.body.author_id],(err, result) => {
  if (err) {
  console.log(err);
  res.render('error');
  } else {
  res.redirect('/bookauthor');
  }
  });
  });

// ==================================================
// Route to edit one specific record.
// ==================================================


router.get('/:recordid/edit', function(req, res, next) {
  let query = "SELECT book_id, author_id FROM book_author WHERE book_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
  if (err) {
  console.log(err);
  res.render('error');
  } else {
  res.render('bookauthor/editrec', {onerec: result[0] });
  }
  });
  });

// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
  let updatequery = "UPDATE book_author SET book_id = ?, author_id = ? WHERE book_id = " + req.body.book_id;
  db.query(updatequery,[req.body.book_id, req.body.author_id],(err, result) => {
  if (err) {
  console.log(err);
  res.render('error');
  } else {
  res.redirect('/bookauthor');
  }
  });
  });

// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
  let query = "DELETE FROM book_author WHERE book_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
  if (err) {
  console.log(err);
  res.render('error');
  } else {
  res.redirect('/bookauthor');
  }
  });
  });

module.exports = router;
