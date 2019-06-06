const db = require('../../db')

const makeChoice = (req, res) => {
  db.Attendee.findOne({where: {form_id: req.body.uuid}})
    .then((attendee) => {
      req.body.dish_ids.forEach((id) => {
        attendee.addDish(id)
      })
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
