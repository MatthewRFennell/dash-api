const db = require('../db')

const editEvent = (req, res) => {
  db.Event.update({
    name: req.body.name,
    date: req.body.date,
    blurb: req.body.blurb,
    tickets: req.body.tickets
  }, {where: {event_id: req.body.id}})
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


module.exports = editEvent