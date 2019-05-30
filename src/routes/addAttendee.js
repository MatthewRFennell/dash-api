const db = require('../db')

const addAttendee = (req, res) => {
  // Takes first name, last name, diet and event ID
  // Adds attendee to table

  db.Event.findOne({
    where: {
      event_id: req.body.id,
      accountAccountId: req.user.account_id
    }
  }).then(event => {
    db.Attendee.create({
      fname: req.body.fname,
      sname: req.body.sname,
      diet: req.body.diet
    }).then((attendee) => {
      return attendee.setEvent(event)
    })
      .then(() => {
        res.status(200)
        res.send({
          success: true
        })
      }).catch(() => {
        res.status(400)
        res.send({
          success: false,
          message: 'Failed to add attendee'
        })
      })
  }).catch(() => {
    res.status(400)
    res.send({
      successs: false,
      message: 'Event does not exists'
    })
  })

}

module.exports = addAttendee