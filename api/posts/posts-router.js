const express = require('express');
const Posts = require('./posts-model'); 
const mw = require('../middleware/middleware');

const router = express.Router();

router.get('/', mw.logger, (req, res) => {
Posts.get()
.then(posts => {
  res.status(200).json(posts)
})
.catch(err => {
  next(err)
})
});

router.get('/:id', mw.validatePostId, (req, res) => {
res.status(200).json(req.post);
});

router.use((err, req, res, next) => {
  res.status(500).json({
    message: "something blew up!", 
    error: err.message // this message is coming from error in each statement
  })
})

module.exports = router;