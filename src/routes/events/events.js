const db = require('../../db')

const events = (req, res) => {
  db.Event.findAll({
    where: { accountAccountId: req.user.account_id }
  })
    .then(results => {
      res.status(200)
      res.send({
        success: true,
        events: results
      })
    })
    .catch(err => {
      console.log(err)
      res.status(400)
      res.send({
        success: false,
        message: 'This account id does not exist!'
      })
    })
}

module.exports = events