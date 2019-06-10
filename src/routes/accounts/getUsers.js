const db = require('../../db')

const getUsers = (req, res) => {
  if (req.user.type !== null && !db.adminAccounts.includes(req.user.type)) {
    res.status(401)
    res.send({
      success: false,
      message: 'Unauthorized'
    })
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