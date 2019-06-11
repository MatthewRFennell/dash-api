const db = require('../../db')

const makeChoice = (req, res) => {
  db.Attendee.findOne({ where: { form_id: req.body.uuid } })
    .then((attendee) => {
      for (const choice of req.body.choices) {
        db.sequelize.query(`INSERT into menuchoice VALUES (${attendee.attendee_id}, ${choice.dish_id}, ${choice.itinerary_id})`)
          .catch(err => {
            console.log(err)
            res.status(400)
            res.send({
              success: false,
              message: 'An invalid choice was made!'
            })
            return
          })
      }
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
