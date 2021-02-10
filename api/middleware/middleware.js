const Posts = require('../posts/posts-model'); 
const Users = require('../users/users-model');

function logger(req, res, next) {
  // do your magic!
}

function validateUserId(req, res, next) {
  // do your magic!
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}

module.exports = {
  logger,
  validateUserId, 
  validateUser, 
  validatePost
}