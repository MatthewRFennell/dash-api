const db = require('../../db')

const editTransport = (req, res) => {
  db.Transport.findOne({
    where: {
      transport_id: req.body.transport_id
    }
  })
    .then(transport => {
      if (transport == null) throw new Error('User attempted to edit non existent transport')
      transport.update({
        operator: req.body.operator,
        vessel_id: req.body.vessel_id,
        duration: req.body.duration,
        departTime: req.body.departTime,
        departFrom: req.body.departFrom,
        arriveAt: req.body.arriveAt
      })
        .then(newTransport => {
          res.status(200)
          res.send({
            success: true,
            transport: newTransport
          })
        })
        .catch(err => {
          console.log(err)
          res.status(400)
          res.send({
            success: false,
            message: 'Error updating transport!'
          })
        })
    })
    .catch(err => {
      console.log(err)
      res.status(400)
      res.send({
        success: false,
        message: 'Database error, missing id parameter or invalid id'
      })
    })
}

module.exports = editTransport