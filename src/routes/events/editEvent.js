const db = require('../../db')

const editEvent = (req, res) => {
  if (!db.accountIsAdmin(req.user, res)) {
    return
  }
  db.Event.findOne({
    where: {event_id: req.body.event_id}
  })
    .then(event => {
      if (event == null) throw new Error('Event does not exist!')
      if (event.accountAccountId != req.user.account_id) throw new Error('User requested event not belonging to them')
      event.update({
        name: req.body.name,
        date: req.body.date,
        blurb: req.body.blurb,
        tickets: req.body.tickets,
        company: req.body.company
      })
      res.status(200)
      res.send({
        success: true
      })
    })
    .catch(err => {
      console.log(err)
      res.status(400)
      res.send({
        success: false,
        message: 'Database error, missing id parameter or invalid event id'
      })
    })
}


module.exports = editEvent