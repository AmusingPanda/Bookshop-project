var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');

// ==================================================
// Route Check Login Credentials
// ==================================================
router.post('/login', function(req, res, next) {
  let query = "select customer_id, first_name, last_name, password from customer WHERE username = '" + req.body.username + "'";
  // execute query
  db.query(query, (err, result) => {
  if (err) {res.render('error');}
  else {
  if(result[0])
  {
  // Username was correct. Check if password is correct
  bcrypt.compare(req.body.password, result[0].password, function(err, result1) {
  if(result1) {
  // Password is correct. Set session variables for user.
  var custid = result[0].customer_id;
  req.session.customer_id = custid;
  var custname = result[0].first_name + " "+ result[0].last_name;
  req.session.custname = custname;
  res.redirect('/');
  } else {
  // password do not match
  res.render('customer/login', {message: "Wrong Password"});
  }
  });
  }
  else {res.render('customer/login', {message: "Wrong Username"});}
  }
  });
  })

// ==================================================
// Route Check Login Credentials
// ==================================================
router.get('/logout', function(req, res, next) {
  req.session.customer_id = 0;
  req.session.custname = "";
  req.session.cart=[];
  req.session.qty=[];
  res.redirect('/');
  });

// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {
  let insertquery = "INSERT INTO customer (first_name, last_name, email, username, password) VALUES (?, ?, ?, ?, ?)";
  bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(req.body.password, salt, (err, hash) => {
  if(err) { res.render('error');}
  db.query(insertquery,[req.body.first_name, req.body.last_name,
  req.body.email, req.body.username, hash],(err, result) => {
  if (err) {
  console.log(err);
  res.render('error');
  } else {
  res.redirect('/customer');
  }
  });
  });
  });
  });

// ==================================================
// Route Enable Registration
// ==================================================
router.get('/register', function(req, res, next) {
  res.render('customer/addrec');
  });

// ==================================================
// Route Provide Login Window
// ==================================================
router.get('/login', function(req, res, next) {
  res.render('customer/login', {message: "Please Login"});
  });


//==================================================
// Route to list all records
//==================================================
router.get('/', function(req, res, next) {
  let query = "SELECT customer_id, first_name, last_name, email, username FROM customer";
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    }
    // render the view with the records
    res.render('customer/allrecords', { allrecs: result });
  });
});



// ==================================================
// Route to view one specific record. Notice the view is one record
// ==================================================

router.get('/:recordid/show', function(req, res, next) {
  let query = "SELECT customer_id, first_name, last_name, email, username FROM customer WHERE customer_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      res.render('customer/onerec', {onerec: result[0]});
    }
  });
});

// ==================================================
// Route to show empty form to obtain input form end-user.
// ==================================================
router.get('/addrecord', function(req, res, next) {
  res.render('customer/addrec');
  });



// ==================================================
// Route to obtain user input and save in database.
// ==================================================
router.post('/', function(req, res, next) {
  let insertquery = "INSERT INTO customer (first_name, last_name, email, username, password) VALUES (?, ?, ?, ?, ?)";
  db.query(insertquery, [req.body.first_name, req.body.last_name, req.body.email, req.body.username, req.body.password], (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      res.redirect('/customer');
    }
  });
});


// ==================================================
// Route to edit one specific record.
// ==================================================

router.get('/:recordid/edit', function(req, res, next) {
  let query = "SELECT customer_id, first_name, last_name, email, username FROM customer WHERE customer_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      res.render('customer/editrec', { onerec: result[0] });
    }
  });
});


// ==================================================
// Route to save edited data in database.
// ==================================================
router.post('/save', function(req, res, next) {
  let updatequery = "UPDATE customer SET first_name = ?,last_name  = ?, email  = ?, username = ? WHERE customer_id = " + req.body.customer_id;
  db.query(updatequery,[req.body.first_name, req.body.last_name, req.body.email, req.body.username],(err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      res.redirect('/customer');
    }
  });
});

// ==================================================
// Route to delete one specific record.
// ==================================================
router.get('/:recordid/delete', function(req, res, next) {
  let query = "DELETE FROM customer WHERE customer_id = " + req.params.recordid;
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      console.log(err);
      res.render('error');
    } else {
      res.redirect('/customer');
    }
  });
});

module.exports = router;
