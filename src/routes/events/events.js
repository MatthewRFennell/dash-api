const db = require('../../db')

const events = (req, res) => {
  let account_id
  if (req.query.account_id && db.adminAccounts.includes(req.user.type)) {
    account_id = req.query.account_id
  } else {
    account_id = req.user.account_id
  }
  db.Event.findAll({
    where: { accountAccountId: account_id }
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