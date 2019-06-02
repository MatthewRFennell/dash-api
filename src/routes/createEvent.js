const db = require('../db')

const sendImageToGCS = require('../gcs')

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
      blurb: req.body.blurb
    })
      .then(event => {
        return event.setAccount(user)
      })
      .then((event) => {
        res.status(200)
        sendImageToGCS(req, res, event.event_id, (url) => {
          console.log('returned, image uploaded')
          db.Event.update({
            image: url
          }, {where: {event_id: event.event_id}}).then(() => {
            event.image = url
            res.send({
              success: true,
              event
            })
          })
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
