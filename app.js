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

const login = require('./src/routes/login/login')
const register = require('./src/routes/login/register')

const events = require('./src/routes/events/events')
const fullevent = require('./src/routes/events/fullevent')
const addEvent = require('./src/routes/events/addEvent')
const editEvent = require('./src/routes/events/editEvent')

const addAttendee = require('./src/routes/attendees/addAttendee')
const deleteAttendee = require('./src/routes/attendees/deleteAttendee')
const editAttendee = require('./src/routes/attendees/editAttendee')

const addTransport = require('./src/routes/transport/addTransport')
const editTransport = require('./src/routes/transport/editTransport')

const addItinerary = require('./src/routes/itinerary/addItinerary')
const editItinerary = require('./src/routes/itinerary/editItinerary')

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

app.get('/events', passport.authenticate('jwt', {session : false}), events)

app.get('/event', passport.authenticate('jwt', {session : false}), fullevent)
app.post('/event', passport.authenticate('jwt', {session : false}), upload.single('image'), addEvent)
app.put('/event', passport.authenticate('jwt', {session : false}), editEvent)

app.post('/attendee', passport.authenticate('jwt', {session : false}), addAttendee)
app.put('/attendee', passport.authenticate('jwt', {session : false}), editAttendee)
app.delete('/attendee', passport.authenticate('jwt', {session : false}), deleteAttendee)

app.post('/transport', passport.authenticate('jwt', {session : false}), addTransport)
app.put('/transport', passport.authenticate('jwt', {session : false}), editTransport)

app.post('/itinerary', passport.authenticate('jwt', {session : false}), addItinerary)
app.put('/itinerary', passport.authenticate('jwt', {session : false}), editItinerary)

app.listen(process.env.PORT || port, () => {
  logger.info(`Dash Backend started on port ${process.env.PORT || port}`)
})
