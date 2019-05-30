const db = require('../db')
const fs = require('fs')

const createEvent = (req, res) => {
  db.Account.findOne({
    where: { email: req.user.dataValues.email }
  }).then(user => {
    image = req.file
    if (image === null) throw new Error('Missing image!')

    db.Event.create({
      name: req.body.name,
      date: req.body.date,
      tickets: req.body.tickets,
      image_path: image.path,
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
        fs.unlinkSync(image.path)
        res.status(400)
        res.send({
          success: false,
          message: 'Malformed or missing parameters!'
        })
      })
  }).catch(() => {
    fs.unlinkSync(req.file.path)
    res.status(400)
    res.send({
      success: false,
      message: 'User with that email does not exists'
    })
  })
}

module.exports = createEvent