const db = require('../db')

const createEvent = (req, res) => {
  db.Account.findOne({
    where: { email: req.body.email}
  }).then(user => {
    db.Event.create({
      name: req.body.name,
      date: req.body.date,
      image_path: req.body.path,
      blurb: req.body.blurb
    })
      .then(event => {
        return event.setAccount(user)
      })
      .then(() => {
        res.status(200)
        res.send({
          success: true
        })
      })
      .catch(() => {
        res.status(400)
        res.send({
          success: false,
          message: 'Malformed or missing parameters!'
        })
      })
  }).catch(() => {
    res.status(400)
    res.send({
      success: false,
      message: 'User with that email does not exists'
    })
  })
}

module.exports = createEvent