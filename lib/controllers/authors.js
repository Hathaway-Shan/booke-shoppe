const { Router } = require('express');
// const { response } = require('../app');
const Author = require('../models/Authors');
const { convertBooks } = require('../models/Constructor');

const router = Router();

router
  .get('/', async (req, res) => {
    const authors = await Author.getAll();
    if (authors.books) {
      authors.books = convertBooks(authors.books);
    }
    res.json(authors);
  })
  .get('/:id', async (req, res) => {
    const author = await Author.getById(req.params.id);
    if (author.books) {
      //we set author.book equal to the array of Book instances in convertBooks
      author.books = convertBooks(author.books);
    }
    res.json(author);
  });

module.exports = router;
