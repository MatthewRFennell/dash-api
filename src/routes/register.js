const db = require("../db")
const bcrypt = require("bcrypt")
const logger = require('../util')
const Sequelize = require("sequelize")

const saltRounds = 12

const register = (req, res) => {
    logger.info(`Registering now`)
    res.status(200)
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        db.Test.create({
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
}

module.exports = register