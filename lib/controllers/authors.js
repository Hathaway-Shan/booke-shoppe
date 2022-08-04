const { Router } = require('express');
const Author = require('../models/Authors');

const router = Router();

router
  .get('/', async (req, res) => {
    const authors = await Author.getAll();

    res.json(authors);
  })
  .get('/:id', async (req, res) => {
    const id = await Author.getById(req.params.id);
    res.json(id);
  });

module.exports = router;
