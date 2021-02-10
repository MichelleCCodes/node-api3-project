const express = require('express');
const Posts = require('./posts-model'); 
const mw = require('../middleware/middleware');

const router = express.Router();

router.get('/', (req, res) => {
  // RETURN AN ARRAY WITH ALL THE POSTS
});

router.get('/:id', (req, res) => {
  // RETURN THE POST OBJECT
  // this needs a middleware to verify post id
});

module.exports = router;