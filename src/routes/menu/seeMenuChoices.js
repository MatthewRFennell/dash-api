const db = require('../../db')

// I am given an event, I return menu choices for all attendees of the event
// TODO: Should be protected

const seeMenuChoices = (req, res) => {
  db.Itinerary.findAll({
    where: { eventEventId: req.query.eventId },
  })
    .then(itineraries => {
      const plainItineraries = JSON.parse(JSON.stringify(itineraries))
      var itineraryChoices = new Set([])
      plainItineraries.forEach((itinerary) => {
        itineraryChoices.add(menuChoicesOf(itinerary.itinerary_id))
      })
      return itineraryChoices
    })
    .then(choices => {
      choices.for
    })
  res.status(200)
  res.send({
    success: true,
  })
}

// To implement
const menuChoicesOf = (itineraryId) => {
  console.log(itineraryId)
}

// To implement
//const seeItineraryMenuChoicesForAttendee = (attendeeId) => {
//}

module.exports = seeMenuChoices
