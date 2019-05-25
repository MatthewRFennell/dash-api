const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize');
const logger = require('./src/util')
const app = express()
const port = 3000
const bcrypt = require('bcrypt')
const saltRounds = 12

const sequelize = new Sequelize('postgres://g1827124_u:RcpqcbAwaY@db.doc.ic.ac.uk:5432/g1827124_u?ssl=true')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  })

const Model = Sequelize.Model;
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
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    Test.create({
      fname: req.body.firstname,
      sname: req.body.lastname,
      email: req.body.email,
      password: hash,
    })
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
})

app.post('/login', (req, res) => {
  logger.info(`Logging user in`)
  res.status(200)
  sequelize.sync().then(() => Test.findOne({
    where: {email: req.body.email}
  }))
  .then(user => {
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, suc) => {
        if (suc) {
          res.send({
            success: true,
            message: "Logged in.",
          })
        } else {
          res.send({
            success: false,
            message: "Incorrect password. Please try again.",
          })
        }
      })
    } else {
      res.send({
        success: false,
        message: "Email not found. Check these details and try again.",
      })
    }
  })
})

app.listen(port, () => {
  logger.info(`Dash Backend started on port ${port}`)
})
