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

const brewCoffee = require('./src/routes/coffee/brewCoffee')

const login = require('./src/routes/login/login')
const register = require('./src/routes/login/register')

const getUsers = require('./src/routes/accounts/getUsers')

const events = require('./src/routes/events/events')
const fullevent = require('./src/routes/events/fullevent')
const addEvent = require('./src/routes/events/addEvent')
const editEvent = require('./src/routes/events/editEvent')

const addAttendee = require('./src/routes/attendees/addAttendee')
const deleteAttendee = require('./src/routes/attendees/deleteAttendee')
const editAttendee = require('./src/routes/attendees/editAttendee')
const confirmAttendee = require('./src/routes/attendees/confirmAttendee')

const addTransport = require('./src/routes/transport/addTransport')
const editTransport = require('./src/routes/transport/editTransport')
const deleteTransport = require('./src/routes/transport/deleteTransport')

const addItinerary = require('./src/routes/itinerary/addItinerary')
const editItinerary = require('./src/routes/itinerary/editItinerary')

const menus = require('./src/routes/menu/menus')
const addMenu = require('./src/routes/menu/addMenu')
const editMenu = require('./src/routes/menu/editMenu')
const setMenu = require('./src/routes/menu/setMenu')

const makeChoice = require('./src/routes/menu/makeChoice')
const getLinks = require('./src/routes/menu/getLinks')

const getEventForm = require('./src/routes/eventForm/getEventForm')
const submitEventForm = require('./src/routes/eventForm/submitEventForm')

const getUserMenus = require('./src/routes/menu/getUserMenus')
const seeMenuChoices = require('./src/routes/menu/seeMenuChoices')

const setLogo = require('./src/routes/login/setLogo')


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

app.get('/coffee', brewCoffee)

app.post('/register', register)
app.post('/login', login)

app.get('/users', passport.authenticate('jwt', { session: false }), getUsers)

app.get('/events', passport.authenticate('jwt', { session: false }), events)

app.use('/event', passport.authenticate('jwt', { session: false }))
app.get('/event', fullevent)
app.post('/event', upload.single('image'), addEvent)
app.put('/event', editEvent)

app.use('/attendee', passport.authenticate('jwt', { session: false }))
app.post('/attendee', addAttendee)
app.put('/attendee', editAttendee)
app.delete('/attendee', deleteAttendee)

app.post('/confirmAttendee', passport.authenticate('jwt', { session: false }), confirmAttendee)

app.use('/transport', passport.authenticate('jwt', { session: false }))
app.post('/transport', addTransport)
app.put('/transport', editTransport)
app.delete('/transport', deleteTransport)

app.use('/itinerary', passport.authenticate('jwt', { session: false }))
app.post('/itinerary', addItinerary)
app.put('/itinerary', editItinerary)

app.use('/menu', passport.authenticate('jwt', { session: false }))
app.get('/menu', menus)
app.post('/menu', addMenu)
app.put('/menu', editMenu)

app.post('/setMenu', passport.authenticate('jwt', { session: false }), setMenu)

app.get('/form', getEventForm)
app.post('/form', submitEventForm)

app.get('/getlinks', getLinks)
app.get('/getMenus', getUserMenus)
app.post('/makechoice', makeChoice)
app.get('/menuchoices', passport.authenticate('jwt', { session: false }), seeMenuChoices)

app.post('/logo', passport.authenticate('jwt', { session: false }), upload.single('image'), setLogo)

app.listen(process.env.PORT || port, () => {
  logger.info(`Dash Backend started on port ${process.env.PORT || port}`)
})
