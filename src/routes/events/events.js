const db = require('../../db')

const events = (req, res) => {
  if (!req.user) {
    res.status(400)
    res.send({
      success: false
    })
    return
  }
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
      res.status(500)
      res.send({
        success: false
      })
    })
}

module.exports = events