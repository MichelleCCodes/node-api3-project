const express = require('express');
const Users = require('./users-model');
const Posts = require('../posts/posts-model'); 
const mw = require('../middleware/middleware');

const router = express.Router();

router.get('/', (req, res) => {
Users.get()
.then(posts => {
  res.status(200).json(posts)
})
});

router.get('/:id', mw.validateUserId,(req, res) => {
res.status(200).json(req.user)
});

router.post('/', mw.validateUser, (req, res) => {
Users.insert(req.body)
.then(user =>  {
  res.status(201).json(user)
})
.catch(err => {
  next(err)
})
});

router.put('/:id', mw.validateUserId, mw.validateUser, (req, res) => {
Users.update(req.params.id, req.body)
.then(user => {
  res.status(201).json(user)
})
.catch(err => {
  next(err)
})
});

router.delete('/:id',mw.validateUserId, (req, res) => {
Users.remove(req.params.id)
.then((users)=> {
  res.status(201).json(users)
})
.catch(err => {
  next(err)
})
  // RETURN THE FRESHLY DELETED USER OBJECT
  // not returning the freshly deleted user object
});

router.get('/:id/posts', mw.validateUserId, (req, res) => {
  Users.getUserPosts(req.params.id)
  .then(userPost => {
    res.status(200).json(userPost)
  })
  .catch(err => {
    next(err)
  })
});

router.post('/:id/posts', mw.validateUserId, mw.validatePost, (req, res) => {
  const {text, user_id} = req.body
  Posts.insert({text, user_id})
  .then(post => {
    res.status(201).json(post)
  })
  .catch(err => {
    next(err)
  })
});


router.use((err, req, res, next) => {
  res.status(500).json({
    message: "something blew up!", 
    error: err.message // this message is coming from error in each statement
  })
})

module.exports = router;