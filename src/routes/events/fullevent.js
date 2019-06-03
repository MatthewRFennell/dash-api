const db = require('../../db')

const fullevent = (req, res) => {
  if (!req.user || !req.query.id) {
    res.status(400)
    res.send({
      success: false
    })
    return
  }

  db.Event.findOne({
    where: { event_id: req.query.id }
  })
    .then(event => {
      if (event === null) {
        throw new Error('Non existent event requested')
      }
      if (event.accountAccountId != req.user.account_id) {
        throw new Error('User requested event not belonging to them')
      }

      db.Attendee.findAll({
        attributes: ['attendee_id', 'fname', 'sname', 'diet'],
        where: { eventEventId: event.event_id }
      })
        .then(attendees => {
          res.send({
            success: true,
            events: event,
            attendees: attendees,
            transport: {}
          })
        })
    })
    .catch(err => {
      console.log(err)
      res.status(400)
      res.send({
        success: false,
        message: 'This event does not exist!'
      })
    })
}

module.exports = fullevent