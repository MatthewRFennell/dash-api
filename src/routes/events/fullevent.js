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
    order: [
      [db.Itinerary, 'start_date', 'ASC']
    ],
    include: [
      {
        model: db.Attendee,
        attributes: ['attendee_id', 'form_id', 'fname', 'sname', 'diet'],
        include: [db.Transport],
      },
      {
        model: db.Itinerary,
        include: [
          {
            model: db.Menu,
            include: [
              {
                model: db.Course,
                include: [db.Dish]
              }
            ]
          }
        ]
      }
    ]
  })
    .then(event => {
      if (event === null) {
        throw new Error('Non existent event requested')
      }
      if ((req.user.type && !db.adminAccounts.includes(req.user.type)) && event.accountAccountId != req.user.account_id) {
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