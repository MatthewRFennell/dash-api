const db = require('../../db')

const confirmAttendee = (req, res) => {
  db.Attendee.findOne({
    where: {
      attendee_id: req.body.attendee_id
    }
  })
    .then(attendee => {
      if (attendee == null) throw new Error('Attendee does not exist!')
      attendee.update({
        confirmed: true,
      })
        .then(() => {
          res.status(200)
          res.send({
            success: true
          })
        })
        .catch(err => {
          console.log(err)
          res.status(400)
          res.send({
            success: false,
            message: 'Failed to confirm attendee'
          })
        })
    })
    .catch(err => {
      console.log(err)
      res.status(400)
      res.send({
        success: false,
        message: 'Database error or Attendee does not exist!'
      })
    })
}

module.exports = confirmAttendee