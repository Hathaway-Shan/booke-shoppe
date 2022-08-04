const Book = require('./Books');

function convertBooks(books) {
  books = books.map((book) => new Book(book));
  return books;
}
