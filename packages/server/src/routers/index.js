const express = require('express');

const router = express.Router();

// basic get route example
// GET localhost:3000
// { "hello": "world" }
router.get('/', (req, res) => {
  res.json({ hello: 'world' });
});

// route example with params
// GET localhost:3000/chris
// { "hello": "chris" }
router.get('/:name', (req, res) => {
  res.json({ hello: req.params.name });
});

module.exports = router;
