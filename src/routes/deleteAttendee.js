const db = require('../db')

const deleteAttendee = (req, res) => {
  // Takes event id and attendee id
  // Reports success even on failure
  console.log(req.query.attendee_id)
  console.log(req.query)
  db.Attendee.findOne({
    attributes: ['attendee_id', 'eventEventId'],
    where: {
      attendee_id: req.query.attendee_id
    }
  })
    .then(attendee => {
      if (attendee) {
        db.Event.findOne({
          attributes: ['event_id', 'accountAccountId'],
          where: {
            event_id: attendee.eventEventId
          }
        })
          .then(event => {
            if (event && (event.accountAccountId === req.user.account_id)) {
              attendee.destroy()
              res.status(200)
              res.send({
                success: true
              })
            } else {
              res.status(400)
              res.send({
                success: false,
                message: 'This even\'t isn\'t your event'
              })
            }
          })
          .catch(err => {
            console.log(err)
            res.status(400)
            res.send({
              success: false,
              message: 'Couldn\'t find event'
            })
          })
      } else {
        console.log('User attempted to delete non existent attendee')
        res.status(400)
        res.send({
          success: false
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