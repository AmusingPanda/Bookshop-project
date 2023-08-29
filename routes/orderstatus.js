var express = require('express');
var router = express.Router();

//==================================================
// Route to list all records
//==================================================
router.get('/', function(req, res, next) {
    let query = "SELECT status_id, status_name FROM order_status";
    // execute query
    db.query(query, (err, result) => {
      if (err) {
        console.log(err);
        res.render('error');
      }
      // render the view with the records
      res.render('orderstatus/allrecords', { allrecs: result });
    });
  });
  

// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================

router.get('/:recordid/show', function(req, res, next) {
        let query = "SELECT status_id, status_name FROM order_status WHERE status_id = " + req.params.recordid;
        // execute query
        db.query(query, (err, result) => {
          if (err) {
            console.log(err);
            res.render('error');
          } else {
            res.render('orderstatus/onerec', { onerec: result[0] });
          }
        });
      });
      



// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function(req, res, next) {
  res.render('orderstatus/addrec');
  });


// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {
    let insertquery = "INSERT INTO order_status (status_name) VALUES (?)";
    db.query(insertquery,[req.body.status_name],(err, result) => {
      if (err) {
        console.log(err);
        res.render('error');
      } else {
        res.redirect('/orderstatus');
      }
    });
  });
  

// ==================================================
// Route to edit one specific record.
// ==================================================

router.get('/:recordid/edit', function(req, res, next) {
    let query = "SELECT status_id, status_name FROM order_status WHERE status_id = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      res.render('orderstatus/editrec', {onerec: result[0] });
    }
    });
  });
  

// ==================================================
// Route to save edited data in database.
// ==================================================
  router.post('/save', function(req, res, next) {
    let updatequery = "UPDATE order_status SET status_name = ? WHERE status_id = " + req.body.status_id;
    db.query(updatequery,[req.body.status_name],(err, result) => {
      if (err) {
        console.log(err);
        res.render('error');
      } else {
        res.redirect('/orderstatus');
      }
    });
  });
  // ==================================================
// Route to delete one specific record.
// ==================================================
  router.get('/:recordid/delete', function(req, res, next) {
    let query = "DELETE FROM order_status WHERE status_id = " + req.params.recordid;
    // execute query
    db.query(query, (err, result) => {
    if (err) {
    console.log(err);
    res.render('error');
    } else {
    res.redirect('/orderstatus');
    }
    });
    });
  

module.exports = router;
