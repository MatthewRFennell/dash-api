const db = require('../../db')

const makeChoice = (req, res) => {
  db.Attendee.findOne({ where: { form_id: req.body.uuid } })
    .then((attendee) => {
      if (attendee === null) throw new Error('Invalid UUID submitted!')
      for (const choice of req.body.choices) {
        for (const dish of choice.dish_ids) {
          db.sequelize.query(`INSERT into menuchoice VALUES (${attendee.attendee_id}, ${dish}, ${choice.itinerary_id})`)
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
        success: false,
        message: 'Invalid UUID!'
      })
    })
}

module.exports = makeChoice
