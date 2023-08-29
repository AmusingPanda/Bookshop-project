var express = require('express');
var router = express.Router();
//==================================================
// Route to list all records
//==================================================
router.get('/', function(req, res, next) {
  let query = "SELECT address_id, street_number, street_name, city, state, postal_code, country_id, customer_id FROM address";
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    }
    // render the view with the records
    res.render('address/allrecords', { allrecs: result });
  });
});




// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================


router.get('/:recordid/show', function(req, res, next) {
  let query = "SELECT address_id, street_number, street_name, city, state, postal_code, country_id , customer_id FROM address WHERE address_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      res.render('address/onerec', {onerec: result[0]});
    }
  });
});

//===============================================
// Route to show empty form to obtain input form end-user.
// ==================================================


router.get('/addrecord', function(req,res,next){
    let query = "select country_id, country_name from country";
    // execute query
    db.query(query, (err, result) => {
      if(err){
        console.log(err);
        res.render('error');
      }
      else
      {
        let query = "select customer_id, first_name, last_name from customer";
        // execute query
        db.query(query, (err,result2) => {
          if (err)
          {
            console.log(err);
            res.render('error');
          }
          res.render('address/addrec', {country: result, customer: result2});
        });
      }
    });
  });
  




// ==================================================
// Route to obtain user input and save in database.
// ==================================================

router.post('/', function(req, res, next) {
  let insertquery = "INSERT INTO address (street_number, street_name, city, state, postal_code, country_id, customer_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
  db.query(insertquery, [req.body.street_number, req.body.street_name, req.body.city, req.body.state, req.body.postal_code, req.body.country_id, req.body.customer_id], (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      res.redirect('/address');
    }
  });
});



// ==================================================
// Route to edit one specific record.
// ==================================================


router.get('/:recordid/edit', function(req, res, next) {
  let query = "SELECT address_id, street_number, street_name, city, state, postal_code, country_id, customer_id FROM address WHERE address_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      res.render('address/editrec', {onerec: result[0] });
    }
  });
});



// ==================================================
// Route to save edited data in database.
// ==================================================

router.post('/save', function(req, res, next) {
  let updatequery = "UPDATE address SET street_number = ?, street_name = ?, city = ?, state = ?, postal_code = ?, country_id = ?  WHERE address_id = " + req.body.address_id;
  db.query(updatequery,[req.body.street_number, req.body.street_name, req.body.city, req.body.state, req.body.postal_code, req.body.country_id ],(err, result) => {
  if (err) {
  console.log(err);
  res.render('error');
  } else {
  res.redirect('/address');
  }
  });
  });


// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
  let query = "DELETE FROM address WHERE address_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
  if (err) {
  console.log(err);
  res.render('error');
  } else {
  res.redirect('/address');
  }
  });
  });



module.exports = router;
