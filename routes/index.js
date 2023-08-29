var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let query = "SELECT book_id, title, publication_date, language_id, publisher_id, price, isbn, bookimage FROM book WHERE homepage = true"; 

  // execute query
  db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		}
	
	let query = "select promotitle, promoimage, startdate, enddate from promotion where startdate <= current_date() AND enddate >= current_date()";
	db.query(query, (err, result2) => {
		if (err) {
			console.log(err);
			res.render('error');
		}
		res.render('index', {allrecs: result, promos: result2 });
		});
 	});
});

module.exports = router;