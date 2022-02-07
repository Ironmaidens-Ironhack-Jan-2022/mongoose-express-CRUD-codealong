const router = require("express").Router();
const Book = require("../models/Book.model");

router.get("/", (req, res, next) => {
  Book.find()
    .then( booksFromDB => {
      res.render("books/books-list", {books: booksFromDB});
    })
    .catch();
});


router.get("/create", (req, res, next) => {
  res.render("books/book-create");
});


router.post('/create', (req, res, next) => {

  const bookDetails = {
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    rating: req.body.rating,
  }

  Book.create(bookDetails)
    .then( book => {
      res.redirect("/books");
    })
    .catch( err => {
      console.log('Error creating new book...', err);
    })
})


router.get("/:bookId", (req, res, next) => {
  Book.findById(req.params.bookId)
    .then( book => {
      res.render("books/book-details", book);
    })
    .catch();
});



module.exports = router;
