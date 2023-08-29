var express = require("express");
var router = express.Router();

// ==================================================
// Route save cart items to SALEORDER and ORDERDETAILS tables
// ==================================================
router.get("/checkout", function (req, res, next) {
  // Check to make sure the customer has logged-in
  if (
    typeof req.session.customer_id !== "undefined" &&
    req.session.customer_id
  ) {
    // Save SALEORDER Record:
    let insertquery =
      "INSERT INTO customer_order (customer_id, order_date, shipping_method_id) VALUES (?, now(), 1)";
    db.query(insertquery, [req.session.customer_id], (err, result) => {
      if (err) {
        console.log(err);
        res.render("error");
      } else {
        // Obtain the order_id value of the newly created SALEORDER Record
        var order_id = result.insertId;
        // Save ORDERDETAIL Records
        // There could be one or more items in the shopping cart
        req.session.cart.forEach((cartitem, index) => {
          // Perform ORDERDETAIL table insert
          let insertquery =
            "INSERT INTO order_line(order_id, book_id, price, quantity) VALUES (?, ?, (SELECT price from book where book_id = " +
            cartitem +
            "), ?)";
          db.query(
            insertquery,
            [order_id, cartitem, req.session.qty[index]],
            (err, result) => {
              if (err) {
                res.render("error");
              }
            }
          );
        });
        // Empty out the items from the cart and quantity arrays
        req.session.cart = [];
        req.session.qty = [];
        // Display confirmation page
        res.render("checkout", { ordernum: order_id });
      }
    });
  } else {
    // Prompt customer to login
    res.redirect("/customer/login");
  }
});

// ==================================================
// Route to list all products on the catalog
// ==================================================
router.get("/", function (req, res, next) {
  let query =
    "SELECT book_id, title, bookimage, publication_date, language_id, publisher_id, price, isbn FROM book";
  // execute query
  db.query(query, (err, result) => {
    if (err) {
      res.redirect("/");
    }
    res.render("catalog", { allrecs: result });
  });
});

// ==================================================
// Route to add an item to the cart
// ==================================================
router.post("/add", function (req, res, next) {
  if (typeof req.session.cart !== "undefined" && req.session.cart) {
    if (req.session.cart.includes(req.body.book_id)) {
      // Item Exists in Basket - Increase Quantity
      var n = req.session.cart.indexOf(req.body.book_id);
      req.session.qty[n] =
        parseInt(req.session.qty[n]) + parseInt(req.body.qty);
    } else {
      // Item Being Added First Time
      req.session.cart.push(req.body.book_id);
      req.session.qty.push(req.body.qty);
    }
  } else {
    var cart = [];
    cart.push(req.body.book_id);
    req.session.cart = cart;
    var qty = [];
    qty.push(req.body.qty);
    req.session.qty = qty;
  }
  res.redirect("/catalog/cart");
});

// ==================================================
// Route to remove an item from the cart
// ==================================================
router.post("/remove", function (req, res, next) {
  // Find the element index of the auto_id that needs to be removed
  var n = req.session.cart.indexOf(req.body.book_id);
  // Remove element from cart and quantity arrays
  req.session.cart.splice(n, 1);
  req.session.qty.splice(n, 1);
  res.redirect("/catalog/cart");
});

// ==================================================
// Route to show shopping cart
// ==================================================
router.get("/cart", function (req, res, next) {
  if (!Array.isArray(req.session.cart) || !req.session.cart.length) {
    res.render("cart", { cartitems: 0 });
  } else {
    let query =
      "SELECT book_id, title, bookimage, publication_date, language_id, publisher_id, price, isbn FROM book WHERE book_id IN (" +
      req.session.cart +
      ") order by find_in_set (book_id, '" +
      req.session.cart +
      "');";
    // execute query
    db.query(query, (err, result) => {
      if (err) {
        res.render("error");
      } else {
        res.render("cart", { cartitems: result, qtys: req.session.qty });
      }
    });
  }
});

module.exports = router;
