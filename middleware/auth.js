const jwt = require('jsonwebtoken')
const config = require('../config/default')

module.exports = function (req, res, next) {
  // Get token from header
  const token = req.header('x-auth-token')

  // Check if token is available
  if (!token) {
    return res.status(401).json({
      message: 'Authorization is denied because token is not available!',
    })
  }

  // try jwt token verification
  try {
    jwt.verify(token, config.jwtSecret)
    next()
  } catch (error) {
    res.status(401).json({ message: 'The token is not valid!' })
  }
}
