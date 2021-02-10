const Users = require('../users/users-model');

function logger(req, res, next) {
  console.log(res.method, req.baseUrl, Date.now())
  next()
}

const validateUserId = async (req, res, next) => {
  const {id} = req.params
  try {
    const user = await Users.getById(id)
    if(!user){
      res.status(404).json({message: "user not found"})
    } else {
      req.user = user
      next()
    }
  }catch(e){
    res.status(500).json(`Server error : ${e}`)
  }
}

function validateUser(req, res, next) {
if(!res.body){
  res.status(400).json({message: "missing user data"})
} else if (!res.body.name){
  res.status(400).json({message: "missing required name field"})
} else {
  next()
}
}

function validatePost(req, res, next) {
  if(!res.body){
    res.status(400).json({message: "missing post data"})
  } else if (!res.body.text){
    res.status(400).json({message: "missing required text field"})
  } else {
    next()
  }
}

module.exports = {
  logger,
  validateUserId, 
  validateUser, 
  validatePost
}