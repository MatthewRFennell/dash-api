const db = require('../../db')

const deleteAttendee = (req, res) => {
  // Takes event id and attendee id
  db.Attendee.findOne({
    attributes: ['attendee_id', 'eventEventId'],
    include: [
      {
        model: db.Event,
        attributes: ['event_id', 'accountAccountId'],
      }
    ],
    where: {
      attendee_id: req.body.attendee_id
    }
  })
    .then(attendee => {
      if (attendee === null) throw new Error('Non existent attendee!')
      if (attendee.event.accountAccountId === req.user.account_id) {
        attendee.destroy()
        res.status(200)
        res.send({
          success: true
        })
      } else {
        res.status(400)
        res.send({
          success: false,
          message: 'This event isn\'t your event'
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(400)
      res.send({
        success: false,
        message: 'Couldn\'t find attendee'
      })
    })
}

module.exports = deleteAttendee