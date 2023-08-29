var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

// Route to obtain user input and save in database.
router.post('/', function(req, res, next) {
    let insertCustomerQuery = "INSERT INTO customer (first_name, last_name, email, username, password) VALUES (?, ?, ?, ?, ?)";
    let insertAddressQuery = "INSERT INTO address (street_number, street_name, city, state, postal_code, country_id, customer_id) VALUES (?, ?, ?, ?, ?, ?, ?)";

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            if (err) {
                res.render('error');
            } else {
                db.query(insertCustomerQuery, [req.body.first_name, req.body.last_name, req.body.email, req.body.username, hash], (err, customerResult) => {
                    if (err) {
                        console.log(err);
                        res.render('error');
                    } else {
                        let customerId = customerResult.insertId;
                        db.query(insertAddressQuery, [req.body.street_number, req.body.street_name, req.body.city, req.body.state, req.body.postal_code, req.body.country_id, customerId], (err, addressResult) => {
                            if (err) {
                                console.log(err);
                                res.render('error');
                            } else {
                                res.redirect('/customer');
                            }
                        });
                    }
                });
            }
        });
    });
});


// Route to display registration form
router.get('/', function(req, res, next) {
  let query = "SELECT country_id, country_name FROM country";
  db.query(query, (err, result) => {
      if (err) {
          console.log(err);
          res.render('error');
      } else {
          res.render('register/addrec', { country: result });
      }
  });
});

module.exports = router;
