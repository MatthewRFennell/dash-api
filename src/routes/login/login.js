const logger = require('../../util')

const jwt = require('jsonwebtoken')
const passport = require('passport')

const secretKey = require('../../secret')

const login = (req, res) => {
  logger.info('Logging user in')
  console.log('body parsing', req.body)
  passport.authenticate('local', {session : false}, (err, user, info) => {
    if(!user) {
      res.status(401)
      res.send({
        success: false,
        message: info.message
      })
      return
    } else {
      req.login(user, {session : false}, (err) => {
        if (err) {
          res.send(err)
        }

        const reducedUser = {
          account_id : user.account_id,
          type: user.type,
          logo_image: user.logo_image,
          email : user.email,
          fname : user.fname,
          sname : user.sname
        }
        const token = jwt.sign(reducedUser, secretKey, {expiresIn : '24h'})

        res.json({
          success: true,
          token : token,
          user: reducedUser
        })
      })
    }
  })(req, res)
}

module.exports = login