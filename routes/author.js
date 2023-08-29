var express = require('express');
var router = express.Router();
//==================================================
// Route to list all records
//==================================================
router.get('/', function(req, res, next) {
  let query = "SELECT author_id, first_name, last_name FROM author";
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    }
    // render the view with the records
    res.render('author/allrecords', { allrecs: result });
  });
});


// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
router.get('/:recordid/show', function(req, res, next) {
    let query = "SELECT author_id, first_name, last_name FROM author WHERE author_id = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.render('author/onerec', {onerec: result[0] });
    }
    });
    });



// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function(req, res, next) {
  res.render('author/addrec');
  });


// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {
  let insertquery = "INSERT INTO author (first_name, last_name) VALUES (?, ?)";
  db.query(insertquery,[req.body.first_name, req.body.last_name],(err, result) => {
  if (err) {
  console.log(err);
  res.render('error');
  } else {
  res.redirect('/author');
  }
  });
  });

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
  let query = "SELECT author_id, first_name, last_name FROM author WHERE author_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
  if (err) {
  console.log(err);
  res.render('error');
  } else {
  res.render('author/editrec', {onerec: result[0] });
  }
  });
  });


// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
  let updatequery = "UPDATE author SET first_name = ?, last_name = ? WHERE author_id = " + req.body.author_id;
  db.query(updatequery,[req.body.first_name, req.body.last_name],(err, result) => {
  if (err) {
  console.log(err);
  res.render('error');
  } else {
  res.redirect('/author');
  }
  });
  });

  // ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
  let query = "DELETE FROM author WHERE author_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
  if (err) {
  console.log(err);
  res.render('error');
  } else {
  res.redirect('/author');
  }
  });
  });


module.exports = router;
