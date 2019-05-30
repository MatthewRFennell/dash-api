const db = require('../db')

const deleteAttendee = (req, res) => {
  // Takes event id and attendee id
  // Reports success even on failure

  db.Event.findOne({
    attributes: ['event_id', 'accountAccountId'],
    where: {
      event_id: req.body.event_id
    }
  })
    .then(event => {
      if (event && (event.accountAccountId === req.user.account_id)) {
        db.Attendee.findOne({
          where: {
            attendee_id: req.body.attendee_id
          }
        })
          .then((attendee) => {
            if (attendee) {
              attendee.destroy()
            } else {
              console.log('User attempted to delete non existent attendee')
            }
            success(res)
          })
          .catch(err => {
            console.log(err)
            success(res)
          })
        return
      } else {
        console.log('User attempted to delete attendee not belonging to them')
      }
    })
    .catch(err => {
      console.log(err)
      success(res)
    })
}

const success = (res) => {
  res.status(200)
  res.send({
    success: true
  })
}

module.exports = deleteAttendee