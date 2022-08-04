const { Router } = require('express');
const Book = require('../models/Books');
const { convertAuthors } = require('../models/Constructor');

const router = Router();

router
  .get('/', async (req, res) => {
    const books = await Book.getAll();
    if (books.authors) {
      books.authors = convertAuthors(books.authors);
    }
    res.json(books);
  })
  .get('/:id', async (req, res) => {
    const books = await Book.getById(req.params.id);
    if (books.authors) {
      books.authors = convertAuthors(books.authors);
    }
    res.json(books);
  });

module.exports = router;
