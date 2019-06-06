const db = require('../../db')

const getLinks = (req, res) => {
  db.Itinerary.findOne({where: {itinerary_id: req.query.itinerary_id}})
    .then((itinerary) => {
      db.Attendee.findAll({where: {eventEventId: itinerary.eventEventId}})
        .then((attendees) => {
          var links = attendees.map((attendee) => {
            return `/completeform/${attendee.form_id}`
          })
          return links
        })
        .then((links) => {
          res.status(200)
          res.send({
            success: true,
            attendeeLinks: links
          })
        }).catch(err => {
          console.log(err)
          res.status(400)
          res.send({
            success: false
          })
        })
    })
}

module.exports = getLinks
