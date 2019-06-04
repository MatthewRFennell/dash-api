const db = require('../../db')

const getEventForm = (req, res) => {
  if (!req.query.form_id) {
    res.status(400)
    res.send({
      success: false,
      message: 'Missing form id!'
    })
    return
  }
  db.Event.findOne({
    where: { form_id: req.query.form_id },
    include: [
      {
        model: db.Itinerary,
        include: [db.Menu]
      }
    ]
  })
    .then(event => {
      if (event === null) throw new Error('Form id not found!')
      res.status(200)
      res.send({
        success: true,
        event
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

module.exports = getEventForm