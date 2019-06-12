const db = require('../../db')

const addItinerary = (req, res) => {
  db.Event.findOne({
    where: {
      event_id: req.body.event_id
    }
  }).then(event => {
    if (event == null) throw new Error('Event does not exist')
    if (!db.adminAccounts.includes(req.user.type) && event.accountAccountId !== req.user.account_id) throw new Error('User attempted to access event not belonging to them')
    db.Itinerary.create({
      name: req.body.name,
      description: req.body.description,
      start_date: req.body.start_date,
      end_date: req.body.end_date || null,
      long: req.body.long || null,
      lat: req.body.lat || null,
    }).then((itinerary) => {
      return itinerary.setEvent(event)
    })
      .then((itinerary) => {
        res.status(200)
        res.send({
          success: true,
          itinerary
        })
      }).catch((err) => {
        console.log(err)
        res.status(400)
        res.send({
          success: false,
          message: 'Failed to add Itinerary'
        })
      })
  }).catch((err) => {
    console.log(err)
    res.status(400)
    res.send({
      successs: false,
      message: 'Event does not exists'
    })
  })

}

module.exports = addItinerary