const passport = require('passport')
const passportJWT = require('passport-jwt')

const ExtractJWT = passportJWT.ExtractJwt

const LocalStrategy = require('passport-local').Strategy
const JWTStrategy = passportJWT.Strategy

const bcrypt = require('bcrypt')
const db = require('./db')

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
function (email, password, cb) {
  return db.sequelize.sync().then(() => db.Account.findOne({
    where: { email: email }
  }))
    .then(user => {
      if (user) {
        return bcrypt.compare(password, user.password, (err, suc) => {
          if (suc) {
            return cb(null, user, {
              message : 'Logged in Successfully'
            })
          } 
        })
      } 
      return cb(null, false, {
        message: 'Details not valid'
      })
    }).catch(err => {
      return cb(err)
    })
}
))

passport.use(new JWTStrategy({
  jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'yeet'
},
function (jwtPayload, cb) {

  //find the user in db if needed
  return db.sequelize.sync().then(() => db.Account.findOne({
    where : {account_id : jwtPayload.account_id}}) //TODO
    .then(user => {
      return cb(null, user)
    })
    .catch(err => {
      return cb(err)
    }))
}
))

console.log('Passport Running')