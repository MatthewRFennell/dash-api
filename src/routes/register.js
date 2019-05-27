const db = require('../db')
const bcrypt = require('bcrypt')
const logger = require('../util')
const Sequelize = require('sequelize')

const saltRounds = 12

const register = (req, res) => {
  logger.info('Registering now')
  res.status(200)
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    db.Test.create({
      fname: req.body.firstname,
      sname: req.body.lastname,
      email: req.body.email,
      password: hash,
    })
      .then(() => res.send({
        success: true,
        message: 'Account created.'
      }))
      .catch(Sequelize.ConnectionError, () => {
        res.send({
          success: false,
          errType: 'misc',
          message: 'Your details looked fine, but there was an error fulfilling your request. Please try again.'
        })
      })
      .catch(Sequelize.UniqueConstraintError, () => {
        res.send({
          success: false,
          errType: 'email',
          message: 'An account for this email already exists'
        })
      })
  })
}

module.exports = register