var express = require('express');
var router = express.Router();

// ==================================================
// Route to view one specific record. Notice the view is one record
// http://localhost:3002/search?searchcriteria=toyota
// ==================================================
router.get('/', function(req, res, next) {

	let query = "SELECT book_id, title, publication_date, language_id, publisher_id, price, isbn " +
            "FROM book " +
            "WHERE title LIKE '%" + req.query.searchcriteria.replace(/'/g, "''") + "%' " +
            "OR isbn LIKE '%" + req.query.searchcriteria.replace(/'/g, "''") + "%'";


console.log("Query: " + query );

	// execute query
	db.query(query, (err, result) => {
		if (err) {
			console.log(err);
			res.render('error');
		} else {
			res.render('search', {allrecs: result});
		} 
	});
});

module.exports = router;
