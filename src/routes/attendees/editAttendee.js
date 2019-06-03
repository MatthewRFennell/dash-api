const db = require('../../db')

const editAttendee = (req, res) => {
  db.Attendee.findOne({
    where: {
      attendee_id: req.body.id
    }
  })
    .then(attendee => {
      if (attendee == null) throw new Error('Attendee does not exist!')
      attendee.update({
        fname: req.body.fname,
        sname: req.body.sname,
        diet: req.body.diet
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
            message: 'Failed to update attendee'
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

module.exports = editAttendee