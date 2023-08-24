const express = require('express');
const router = express.Router();

// Routes to list all records of the books. Display view to list all records.
router.get('/', function(req, res, next) 
{
    // Query to select all records from the book table
    let query = "SELECT b.book_id, b.title, b.bookimage, b.publication_date, bl.language_name," +
    "p.publisher_name, b.price, b.isbn, a.first_name, a.last_name " +
    "FROM book AS b " +
    "JOIN book_author AS ba ON b.book_id = ba.book_id " +
    "JOIN author AS a ON ba.author_id = a.author_id " +
    "JOIN book_language AS bl ON b.language_id = bl.language_id " +
    "JOIN publisher AS p ON b.publisher_id = p.publisher_id";
    
    // Execute query
    db.query(query, (err, result) => 
    {
        if (err)
         {
            console.log(err);
            res.render('error');
        } 

        // Render the book listing page with the data returned from the database
        res.render('books/allrecords', { allrecs: result });
        
    });
});


//Route to view one specific book. Display view to show one book.
router.get('/:recordid/show', function(req, res, next){

    // Query to select one record from the book table and join with book_language and publisher tables
    let query = "SELECT b.book_id, b.title, b.bookimage, b.publication_date, bl.language_name, " +
                "p.publisher_name, b.price, b.isbn, a.first_name, a.last_name " +
                "FROM book AS b " +
                "JOIN book_language AS bl ON b.language_id = bl.language_id " +
                "JOIN publisher AS p ON b.publisher_id = p.publisher_id " +
                "JOIN book_author AS ba ON b.book_id = ba.book_id " +
                "JOIN author AS a ON ba.author_id = a.author_id " +
                "WHERE b.book_id = " + req.params.recordid;

    // Execute query
    db.query(query, (err, result) => {

        if(err){
            console.log(err);
            res.render('error');
        }
        else{
            // Render the book listing page with the data returned from the database
            res.render('books/onerec', {onerec: result[0]});
        }
    });
});



module.exports = router;
