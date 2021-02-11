const Users = require('../users/users-model');
const Posts = require('../posts/posts-model');

function logger(req, res, next) {
  console.log(req.method, req.baseUrl, Date.now())
  next()
}

const validateUserId = async (req, res, next) => {
  const {id} = req.params
  try {
    const user = await Users.getById(id)
    if(!user){
      res.status(404).json({message: `${user} not found`})
    } else {
      req.user = user
      next()
    }
  }catch(err){
    res.status(500).json(`Server error : ${err}`)
  }
}

const validatePostId = async (req, res, next) => {
  const {id} = req.params
  try {
    const post = await Posts.getById(id)
    if(!post){
      res.status(404).json({message: "post not found"})
    } else {
      req.post = post
      next()
    }
  }catch(err){
    res.status(500).json(`Server error : ${err}`)
  }
}

function validateUser(req, res, next) {
if(!req.body){
  res.status(400).json({message: "missing user data"})
} else if (!req.body.name){
  res.status(400).json({message: "missing required name field"})
} else {
  next()
}
}

function validatePost(req, res, next) {
  if(!req.body){
    res.status(400).json({message: "missing post data"})
  } else if (!req.body.text){
    res.status(400).json({message: "missing required text field"})
  } else {
    next()
  }
}

module.exports = {
  logger,
  validateUserId, 
  validatePostId,
  validateUser, 
  validatePost
}