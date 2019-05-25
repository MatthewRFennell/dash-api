const express = require('express')
const bodyParser = require('body-parser')
const logger = require('./src/util')
const app = express()
const port = 3000
const passport = require('passport')

const login = require("./src/routes/login")
const register = require("./src/routes/register")
const me = require("./src/routes/me")

require("./src/passport")

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  logger.info(`Request received.`)
  res.send({
    package: 'Hello World',
  })
})

app.post('/register', register)
app.post('/login', login)
app.get('/me', passport.authenticate('jwt', {session : false}) ,me)


app.listen(port, () => {
  logger.info(`Dash Backend started on port ${port}`)
})
