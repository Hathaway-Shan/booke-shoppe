const { Router } = require('express');
const Author = require('../models/Authors');

const router = Router();

router.get('/', async (req, res) => {
  const authors = await Author.getAll();

  res.json(authors);
});

module.exports = router;
