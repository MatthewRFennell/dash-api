const db = require('../../db')

const fullevent = (req, res) => {
  if (!req.query.event_id) {
    res.status(400)
    res.send({
      success: false,
      message: 'Missing event id!'
    })
    return
  }

  db.Event.findOne({
    where: { event_id: req.query.event_id },
    include: [
      {
        model: db.Attendee,
        attributes: ['attendee_id', 'fname', 'sname', 'diet'],
        include: [db.Transport],
      },
      {
        model: db.Itinerary,
        include: [db.Menu]
      }
    ]
  })
    .then(event => {
      if (event === null) {
        throw new Error('Non existent event requested')
      }
      if (event.accountAccountId != req.user.account_id) {
        throw new Error('User requested event not belonging to them')
      }
      res.status(200)
      res.send({
        success: true,
        event,
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