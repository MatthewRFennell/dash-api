const db = require('../../db')

const getUsers = (req, res) => {
  if (!db.accountIsAdmin(req.user, res)) {
    return
  }
  db.Account.findAll({
    where: { type: db.userAccounts }
  })
    .then(results => {
      res.status(200)
      res.send({
        success: true,
        accounts: results
      })
    })
    .catch(err => {
      console.log(err)
      res.status(400)
      res.send({
        success: false,
        message: 'Failed to retrieve user accounts!'
      })
    })
}

module.exports = getUsers