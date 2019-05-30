const db = require('../db')

const createEvent = (req, res) => {
  db.Account.findOne({
    where: { email: req.body.email }
  }).then(user => {
    if (user === null) throw new Error('Invalid user email!')
    const image = req.file
    if (image === null) throw new Error('Missing image!')

    db.Event.create({
      name: req.body.name,
      date: req.body.date,
      tickets: req.body.tickets,
      image: image.buffer,
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
      .catch((err) => {
        console.log(err.errors)
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