const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('../config/default')
const jsonPatch = require('jsonpatch')
const Jimp = require('jimp')
const auth = require('../middleware/auth')
const { logger } = require('../middleware/logger')

// @route POST /api/users/login
// @desc  logins in a user
// @access  Public

router.post('/login', (req, res) => {
  // log request body
  logger.debug(req.body)

  const { username, password } = req.body
  // validate fields
  if (!username || !password) {
    return res
      .status(400)
      .json({ message: 'Make sure all fields are non-empty' })
  }
  // create a jwt payload
  const payload = {
    username,
    password,
  }

  jwt.sign(payload, config.jwtSecret, (err, token) => {
    if (err) {
      return res.status(500).json({ message: 'A server error occurred!' })
    }
    res.json({ token })
  })
})

// @route PATCH /api/users/patch
// @desc  apply JSON object patching
// @access  Private

router.patch('/patch', auth, (req, res) => {
  // log request body
  logger.debug(req.body)
  // validate required fields
  const { model, patch } = req.body
  if (!model || !patch) {
    return res.status(400).json({
      message: 'Missing fields! both model and patch fields are required',
    })
  }
  const patchedJSON = jsonPatch.apply_patch(model, patch)
  res.json(patchedJSON)
})

// @route GET /api/users/create-thumbnail
// @desc  Image Thumbnail Generator
// @access  Private

router.get('/create-thumbnail', auth, (req, res) => {
  // log request body
  logger.debug(req.body)
  try {
    const { imageURL } = req.body
    if (!imageURL) {
      return res.status(400).json({ message: 'imageURL is required!' })
    }
    Jimp.read(req.body.imageURL, (err, img) => {
      if (err) {
        return res.status(400).json({ message: 'The url can not be read!' })
      }
      img.resize(50, 50).getBase64(Jimp.AUTO, (err, img64) => {
        if (err) {
          return res
            .status(500)
            .json({ message: 'The image can not be resized!' })
        }
        return res.send(img64)
      })
    })
  } catch (e) {
    return res.status(500).json({ message: 'A server error occurred!' })
  }
})
module.exports = router
