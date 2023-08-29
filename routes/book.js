var express = require('express');
var router = express.Router();
//==================================================
// Route to list all records
//==================================================
router.get('/', function(req, res, next) {
  let query = "SELECT book_id, title, publication_date, language_id, publisher_id, price, isbn, homepage, bookimage FROM book";
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    }
    // render the view with the records
    res.render('book/allrecords', { allrecs: result });
  });
});



// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================

router.get('/:recordid/show', function(req, res, next) {
  let query = "SELECT book_id, title, publication_date, language_id, publisher_id, price, isbn, homepage, bookimage FROM book WHERE book_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      res.render('book/onerec', {onerec: result[0]});
    }
  });
});




// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================

router.get('/addrecord', function(req,res,next){
  let query = "select language_id, language_name from book_language";
  // execute query
  db.query(query, (err, result) => {
    if(err){
      console.log(err);
      res.render('error');
    }
    else
    {
      let query = "select publisher_id, publisher_name from publisher";
      // execute query
      db.query(query, (err,result2) => {
        if (err)
        {
          console.log(err);
          res.render('error');
        }
        res.render('book/addrec', {language: result, publisher: result2});
      });
    }
  });
});


// ==================================================
// Route to obtain user input and save in database.
// ==================================================

router.post('/', function(req, res, next) {
  let insertquery = "INSERT INTO book (title, publication_date, language_id, publisher_id, price, isbn, homepage, bookimage) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  var homepage_value = 0;
  if (req.body.homepage){
    homepage_value = 1;
  }

  db.query(insertquery, [req.body.title, req.body.publication_date, req.body.language_id, req.body.publisher_id, req.body.price, req.body.isbn, homepage_value, req.body.bookimage], (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      res.redirect('/book');
    }
  });
});


// ==================================================
// Route to edit one specific record.
// ==================================================

router.get('/:recordid/edit', function(req, res, next) {
  let query = "SELECT book_id, title, publication_date, language_id, publisher_id, price, isbn, homepage, bookimage FROM book WHERE book_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      res.render('book/editrec', { onerec: result[0] });
    }
  });
});



// ==================================================
// Route to save edited data in database.
// ==================================================


router.post('/save', function(req, res, next) {
  let updatequery = "UPDATE book SET title = ?, publication_date = ?, language_id = ?, publisher_id= ?, price = ?, isbn = ?, homepage = ?, bookimage = ? WHERE book_id = " + req.body.book_id;
  var homepage_value = 0;
  if (req.body.homepage){
    homepage_value = 1;
  }
  db.query(updatequery,[req.body.title, req.body.publication_date, req.body.language_id, req.body.publisher_id, req.body.price, req.body.isbn, homepage_value, req.body.bookimage],(err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      res.redirect('/book');
    }
  });
});

// ==================================================
// Route to delete one specific record.
// ==================================================

router.get('/:recordid/delete', function(req, res, next) {
  let query = "DELETE FROM book WHERE book_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      res.redirect('/book');
    }
  });
});

module.exports = router;
