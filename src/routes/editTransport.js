const db = require('../db')

const editTransport = (req, res) => {
  db.Transport.update({
    operator: req.body.operator,
    vessel_id: req.body.vessel_id,
    duration: req.body.duration,
    departTime: req.body.departTime,
    departFrom: req.body.departFrom,
    arriveAt: req.body.arriveAt
  }, {where: {
    transport_id: req.body.id
  }}).then(() => {
    res.status(200)
    res.send({
      success: true
    }).catch(err => {
      console.log(err)
      res.status(400)
      res.send({
        success: false
      })
    })
  })
}

module.exports = editTransport