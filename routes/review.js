var express = require('express');
var router = express.Router();
//==================================================
// Route to list all records
//==================================================
router.get('/', function(req, res, next) {
  let query = "SELECT review_id, customer_id, book_id, rating, review_text FROM review";
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    }
    // render the view with the records
    res.render('review/allrecords', { allrecs: result });
  });
});



// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================
    router.get('/:recordid/show', function(req, res, next) {
      let query = "SELECT review_id, customer_id, book_id, rating, review_text FROM review WHERE review_id = " + req.params.recordid;
      db.query(query, (err, result) => {
        if (err) {
          console.log(err);
          res.render('error');
        } else {
          res.render('review/onerec', { onerec: result[0] });
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
        let query = "select book_id, title from book";
        // execute query
        db.query(query, (err,result2) => {
          if (err)
          {
            console.log(err);
            res.render('error');
          }
          res.render('review/addrec', {customer: result, book: result2});
        });
      }
    });
  });










// ==================================================
// Route to obtain user input and save in database.
// ==================================================
  router.post('/', function(req, res, next) {
    let insertquery = "INSERT INTO review (customer_id, book_id, rating, review_text) VALUES (?, ?, ?, ?)";
    db.query(insertquery, [req.body.customer_id, req.body.book_id, req.body.rating, req.body.review_text], (err, result) => {
      if (err) {
        console.log(err);
        res.render('error');
      } else {
        res.redirect('/review');
      }
    });
  });

// ==================================================
// Route to edit one specific record.
// ==================================================
router.get('/:recordid/edit', function(req, res, next) {
  let query = "SELECT review_id, customer_id, book_id, rating, review_text FROM review WHERE review_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      res.render('review/editrec', {onerec: result[0] });
    }
  });
});



// ==================================================
// Route to save edited data in database.
// ==================================================

router.post('/save', function(req, res, next) {
  let updatequery = "UPDATE review SET customer_id = ?,book_id = ?, rating = ?, review_text = ? WHERE review_id = " + req.body.review_id;
  db.query(updatequery,[req.body.customer_id, req.body.book_id, req.body.rating, req.body.review_text],(err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      res.redirect('/review');
    }
  });
});

  // ==================================================
// Route to delete one specific record.
// ==================================================
  router.get('/:recordid/delete', function(req, res, next) {
    let query = "DELETE FROM review WHERE review_id = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.render('error');
      } else {
        res.redirect('/review');
      }
    });
  });
  
module.exports = router;
