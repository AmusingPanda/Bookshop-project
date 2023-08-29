var express = require('express');
var router = express.Router();
//==================================================
// Route to list all records
//==================================================
router.get('/', function(req, res, next) {
  let query = "SELECT history_id, order_id, status_id, update_date FROM order_history";
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    }
    // render the view with the records
    res.render('orderhistory/allrecords', { allrecs: result });
  });
});


// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================

router.get('/:recordid/show', function(req, res, next) {
  let query = "SELECT history_id, order_id, status_id, update_date FROM order_history WHERE history_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
      if (err) {
          console.log(err);
          res.render('error');
      } else {
          res.render('orderhistory/onerec', { onerec: result[0] });
      }
  });
});



// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function(req,res,next){
  let query = "SELECT co.order_id, c.first_name, c.last_name FROM customer_order co INNER JOIN customer c ON co.customer_id = c.customer_id ";
  // execute query
  db.query(query, (err, result) => {
    if(err){
      console.log(err);
      res.render('error');
    }
    else
    {
      let query = "select status_id, status_name from order_status";
      // execute query
      db.query(query, (err,result2) => {
        if (err)
        {
          console.log(err);
          res.render('error');
        }
        res.render('orderhistory/addrec', {orders: result, status: result2});
      });
    }
  });
});



// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {
  let insertquery = "INSERT INTO order_history (order_id, status_id, update_date) VALUES (?, ?, ?)";
  db.query(insertquery, [req.body.order_id, req.body.status_id, req.body.update_date], (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      res.redirect('/orderhistory');
    }
  });
});

// ==================================================
// Route to edit one specific record.
// ==================================================

router.get('/:recordid/edit', function(req, res, next) {
  let query = "SELECT order_id, status_id, update_date FROM order_history WHERE history_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      res.render('orderhistory/editrec', { onerec: result[0] });
    }
  });
});




// ==================================================
// Route to save edited data in database.
// ==================================================

router.post('/save', function(req, res, next) {
  let updatequery = "UPDATE order_history SET order_id = ?, status_id = ?, update_date = ? WHERE history_id = ?";
  db.query(updatequery, [req.body.order_id, req.body.status_id, req.body.update_date, req.body.history_id], (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      res.redirect('/orderhistory');
    }
  });
});



// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
  let query = "DELETE FROM order_history WHERE history_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      res.redirect('/orderhistory');
    }
  });
});



module.exports = router;
