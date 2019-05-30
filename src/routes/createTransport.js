const db = require('../db')

const createTransport = (req, res) => {
  db.Event.findOne({
    where: {
      event_id: req.body.id,
      accountAccountId: req.user.account_id
    }
  }).then(event => {
    db.Transport.create({
      operator: req.body.operator,
      vessel_id: req.body.vessel_id,
      duration: req.body.duration,
      departTime: req.body.departTime,
      departFrom: req.body.departFrom,
      arriveAt: req.body.arriveAt
    }).then(trans => {
      return trans.setEvent(event)
    }).then(() => {
      res.status(200)
      res.send({
        success: true
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
      message: 'Event does not exists'
    })
  })
}

module.exports = createTransport