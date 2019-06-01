const db = require('../db')

const createEvent = (req, res) => {
  const email = req.body.email || req.user.email
  db.Account.findOne({
    where: { email: email }
  }).then(user => {
    if (user === null) {
      res.status(400)
      res.send({
        success: false,
        message: 'User with that email does not exists'
      })
      return
    }
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
      .then((event) => {
        res.status(200)
        res.send({
          success: true,
          event
        })
      })
      .catch((err) => {
        console.log(err)
        res.status(400)
        res.send({
          success: false,
          message: 'Malformed or missing parameters!'
        })
      })
  }).catch((err) => {
    console.log(err)
    res.status(400)
    res.send({
      success: false,
      message: 'User with that email does not exists'
    })
  })
}

module.exports = createEvent
