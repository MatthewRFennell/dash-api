/*global __dirname process */
require('dotenv').config()

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
const deleteAttendee = require('./src/routes/deleteAttendee')
const createTransport = require('./src/routes/createTransport')
const editEvent = require('./src/routes/editEvent')
const editTransport = require('./src/routes/editTransport')
const editAttendee = require('./src/routes/editAttendee')

require('./src/passport')

process.env.GOOGLE_APPLICATION_CREDENTIALS = __dirname + '/Dash-c3f730d891fb.json'

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
app.put('/editTransport', passport.authenticate('jwt', {session : false}), editTransport)
app.put('/editAttendee', passport.authenticate('jwt', {session : false}), editAttendee)

app.delete('/deleteAttendee', passport.authenticate('jwt', {session : false}), deleteAttendee)

app.listen(process.env.PORT || port, () => {
  logger.info(`Dash Backend started on port ${process.env.PORT || port}`)
})
