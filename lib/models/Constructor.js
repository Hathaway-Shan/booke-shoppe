const Book = require('./Books');

function convertBooks(books) {
  //here we map all the books in authors and return them as instances of the Book class
  books = books.map((book) => new Book(book));
  return books;
}

module.exports = { convertBooks };
