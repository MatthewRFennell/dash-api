const db = require('../../db')

const makeChoice = (req, res) => {
  db.Choice.create({
  })
    .then(() => {
      res.status(200)
      res.send({
        success: true
      })
    }).catch(err => {
      console.log(err)
      res.status(400)
      res.send({
        success: false
      })
    })
}

module.exports = makeChoice
