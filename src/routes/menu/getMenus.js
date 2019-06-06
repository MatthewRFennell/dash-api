const db = require('../../db')

const getMenus = (req, res) => {
  if (!req.query.form_id) {
    res.status(400)
    res.send({
      success: false,
      message: 'Missing form id!'
    })
    return
  }
  db.Attendee.findOne({
    where: { form_id: req.query.form_id },
  })
    .then(attendee => {
      if (attendee === null) throw new Error('Uuid not found!')
      db.Itinerary.findAll({
        where: { eventEventId: attendee.eventEventId },
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
      })
        .then(itineraries => {
          res.status(200)
          res.send({
            success: true,
            attendee,
            itineraries
          })
        })
    })
    .catch(err => {
      console.log(err)
      res.status(400)
      res.send({
        success: false,
        message: 'Incorrect form id!'
      })
    })
}

module.exports = getMenus