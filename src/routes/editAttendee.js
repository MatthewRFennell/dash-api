const db = require('../db')

const editAttendee = (req, res) => {
  db.Attendee.update({
    fname: req.body.fname,
    sname: req.body.sname,
    diet: req.body.diet
  }, {
    where: {
      attendee_id: req.body.id
    }
  }).then(() => {
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

module.exports = editAttendee