/*global process */

const express = require('express')
const bodyParser = require('body-parser')
const logger = require('./src/util')
const passport = require('passport')
const cors = require('cors')
const app = express()
const port = 3000

const multer = require('multer')
const memoryStore = multer.memoryStorage()
const upload = multer({
  storage: memoryStore,
  limits: {
    fileSize: 10000000
  }
})

const login = require('./src/routes/login')
const register = require('./src/routes/register')
const me = require('./src/routes/me')
const events = require('./src/routes/events')
const createEvent = require('./src/routes/createEvent')
const fullevent = require('./src/routes/fullevent')
const addAttendee = require('./src/routes/addAttendee')
const createTransport = require('./src/routes/createTransport')
const editEvent = require('./src/routes/editEvent')
const eventImage = require('./src/routes/eventImage')

require('./src/passport')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.options('*', cors())

app.get('/', (req, res) => {
  logger.info('Request received.')
  res.send('Welcome to the Dash API')
})

app.post('/register', register)
app.post('/login', login)
app.post('/createEvent', passport.authenticate('jwt', {session : false}), upload.single('image'), createEvent)
app.post('/addAttendee', passport.authenticate('jwt', {session : false}), addAttendee)
app.post('/createTransport', passport.authenticate('jwt', {session : false}), createTransport)

app.get('/me', passport.authenticate('jwt', {session : false}) ,me)
app.get('/events', passport.authenticate('jwt', {session : false}) ,events)
app.get('/fullevent', passport.authenticate('jwt', {session : false}) ,fullevent)

app.put('/editEvent', passport.authenticate('jwt', {session : false}), editEvent)
app.get('/eventImage' ,eventImage)

app.listen(process.env.PORT || port, () => {
  logger.info(`Dash Backend started on port ${process.env.PORT || port}`)
})
