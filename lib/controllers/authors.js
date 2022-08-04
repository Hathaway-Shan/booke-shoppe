const { Router } = require('express');
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
  })
  .post('/', async (req, res) => {
    const author = await Author.insert(req.body);
    if (req.body.bookIds) {
      await Promise.all(req.body.bookIds.map((id) => author.addBookById(id)));
    }
    res.json(author);
  });

module.exports = router;
