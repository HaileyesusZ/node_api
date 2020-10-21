const express = require('express')
const app = express()
const user = require('./route/user')
const { logger, expressLogger } = require('./middleware/logger')

// register middleware
app.use(express.json())
app.use(expressLogger)
// register route
app.use('/api/users', user)
// get port from env or switch to default
const port = process.env.PORT || 8000
// start server
app.listen(port, () => {
  logger.info(`server running on port ${port}`)
})

module.exports = app
