

Step 0: initial setup (ironlauncher)


Step 1: create seed file



Step 2: (READ) display a list with all books in the DB
- [ ] Create a route (GET `/books`)
- [ ] Make a request to the DB --> Book.find()
- [ ] Create a view (and pass the data from the database)


Step 3: (READ) book details page
- [ ] Update `books-list.hbs` (add link to each book)
- [ ] Create a route (GET `/books/:bookId`)
- [ ] Make a request to the DB to get the details of book with id `bookId` --> Book.findById()
- [ ] Create view (`book-details.hbs`)



Step 4: (CREATE) functionality to create new books

- Step 4.a: display a form to create new books
  - [ ] add link in the homepage
  - [ ] Create a route (GET `/books/create`)
  - [ ] Create a view (`book-create.hbs`)

- Step 4.b: receive the information from the form and save in DB
  - [ ] Create a route (POST `/books/create`)
  - [ ] Make a request to the DB to save the new book --> Book.create()
  - [ ] After book is created, we will redirect to `/books` (we don't need to create an additional view)



Step 5: (UPDATE) functionality to update a book

- Step 5.a: display a form to update a book
  - [ ] add link (eg. in book details page)
  - [ ] Create a route (GET `/books/:bookId/edit`)
  - [ ] Make a request to the DB --> Book.findById()
  - [ ] Create a view (`book-edit.hbs`)

- Step 5.b: receive edit form and update DB

  - [ ] Create a route (POST `/books/:bookId/edit`)
  - [ ] Query to the DB --> Book.findByIdAndUpdate(id, newBookDetails)
  - [ ] Redirect to the book details page


Step 6: (DELETE) functionality to delete a book

- [ ] Add a button (ex. in the list of books). We will add it inside a form, so that we send a POST request.
- [ ] Create a route (POST `/books/:bookId/delete`)
- [ ] Query to DB --> Book.findByIdAndDelete(req.params.bookId)
- [ ] Redirect to `/books`

