const passport = require('passport')
const passportJWT = require('passport-jwt')

const ExtractJWT = passportJWT.ExtractJwt

const LocalStrategy = require('passport-local').Strategy
const JWTStrategy = passportJWT.Strategy

const bcrypt = require('bcrypt')
const db = require('./db')

const secretKey = require('./secret')

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
function (email, password, cb) {
  db.Account.findOne({
    where: { email: email.toLowerCase() }
  })
    .then(user => {
      if (user) {
        return bcrypt.compare(password, user.password, (err, suc) => {
          if (suc) {
            return cb(null, user, {
              message: 'Logged in Successfully'
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
  secretOrKey: secretKey
},
function (jwtPayload, cb) {

  return db.Account.findOne({
    where: { account_id: jwtPayload.account_id }
  })
    .then(user => {
      return cb(null, user)
    })
    .catch(err => {
      return cb(err)
    })
}
))

console.log('Passport Running')