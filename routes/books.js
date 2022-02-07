const router = require("express").Router();
const Book = require("../models/Book.model");

router.get("/", (req, res, next) => {
  Book.find()
    .then( booksFromDB => {
      res.render("books/books-list", {books: booksFromDB});
    })
    .catch();
});


module.exports = router;
