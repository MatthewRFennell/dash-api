const db = require('../../db')

const addTransport = (req, res) => {
  db.Attendee.findOne({
    where: {
      attendee_id: req.body.attendee_id
    }
  }).then(attendee => {
    if (attendee == null) throw new Error('User requested non existent attendee')
    db.Transport.create({
      operator: req.body.operator,
      vessel_id: req.body.vessel_id,
      duration: req.body.duration,
      departTime: req.body.departTime,
      departFrom: req.body.departFrom,
      arriveAt: req.body.arriveAt
    }).then(trans => {
      trans.setAttendee(attendee)
      res.status(200)
      res.send({
        success: true,
        transport: trans
      })
    }).catch((err) => {
      console.log(err)
      res.status(400)
      res.send({
        success: false,
        message: 'Failed to add transport details'
      })
    })
  }).catch((err) => {
    console.log(err)
    res.status(400)
    res.send({
      successs: false,
      message: 'Attendee does not exists'
    })
  })
}

module.exports = addTransport