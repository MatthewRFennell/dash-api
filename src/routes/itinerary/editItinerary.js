const db = require('../../db')

const editItinerary = (req, res) => {
  db.Itinerary.update({
    name: req.body.name,
    description: req.body.description,
    start_date: req.body.start_date,
    end_date: req.body.end_date || null,
    long: req.body.long || null,
    lat: req.body.lat || null,
  }, { where: { itinerary_id: req.body.itinerary_id } })
    .then((itinerary) => {
      res.status(200)
      res.send({
        success: true,
        itinerary
      })
    }).catch(err => {
      console.log(err)
      res.status(400)
      res.send({
        success: false
      })
    })
}


module.exports = editItinerary