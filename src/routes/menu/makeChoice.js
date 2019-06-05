const db = require('../../db')

const makeChoice = (req, res) => {
  db.Attendee.findOne({where: {attendee_id: req.body.attendee_id}})
    .then((attendee) => {
      attendee.addDish(req.body.dish_id)
    })
    .then(() => {
      db.Dish.findOne({where: {dish_id: req.body.dish_id}})
    })
    .then((dish) => {
      dish.addAttendee(req.body.attendee_id)
    })
    .then(() => {
      res.status(200)
      res.send({
        success: true
      })
    }).catch(err => {
      console.log(err)
      res.status(400)
      res.send({
        success: false
      })
    })
}

module.exports = makeChoice
