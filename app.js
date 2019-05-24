const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
const logger = require('./src/util')
const app = express()
const port = 3000
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const jwt = require('jsonwebtoken')

const sequelize = new Sequelize('postgres://g1827124_u:RcpqcbAwaY@db.doc.ic.ac.uk:5432/g1827124_u')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

const Model = Sequelize.Model
class Test extends Model {}
Test.init({
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  fname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  sname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
}, {
  sequelize,
  modelName: 'test'
})

passport.use('register', new localStrategy({
  email: 'email',
  password: 'password',
}, async (email, password, done) => {
  try {
    const user = await UserModel.create({ email, password })
    return done(null, user)
  } catch(err) {
    done(err)
  }
}))

app.get('/', (req, res) => {
  logger.info(`Request received.`)
  res.send({
    package: 'Hello World',
  })
})

app.get('/kill', (req, res) => {
  logger.error(`Time to die.`)
  res.send(`You're a murderer!`)
  process.exit(1)
})

app.post('/register', (req, res) => {
  logger.info(`Registering now`)
  res.status(200)
  console.log(req.body)
  sequelize.sync().then(() => Test.create({
    fname: req.body.firstname,
    sname: req.body.lastname,
    email: req.body.email,
    password: 'password',
  }))
  .then(_ => res.send({
    success: true,
    message: "Account created."
  }))
  .catch(Sequelize.ConnectionError, (err) => {
    res.send({
      success: false,
      message: "Your details looked fine, but there was an error fulfilling your request. Please try again."
    })
  })
  .catch(Sequelize.UniqueConstraintError, (err) => {
    res.send({
      success: false,
      message: "An account with this email address already exists. Please log in instead."
    })
  })
})

passport.use('login', new localStrategy({
  email: 'email',
  password: 'password'
}, async (email, password, done) => {
  try {
    const user = await Test.findOne({ email })
    if(!user){
      return done(null, false, { message : 'User not found'})
    }
    const isInDatabase = await user.isValidPassword(password)
    if(!isInDatabase){
      return done(null, false, { message : 'Wrong Password'})
    }
    return done(null, user, { message : 'Logged in Successfully'})
  } catch (error) {
    return done(error)
  }
}))

app.listen(port, () => {
  logger.info(`Dash Backend started on port ${port}`)
})
