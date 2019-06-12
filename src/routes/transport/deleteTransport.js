const db = require('../../db')

const editTransport = (req, res) => {
  db.Transport.findOne({
    where: {
      transport_id: req.body.transport_id
    }
  })
    .then(transport => {
      if (transport == null) throw new Error('User attempted to delete non existent transport')
      transport.destroy()
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
        message: 'Database error, missing id parameter or invalid id'
      })
    })
}

module.exports = editTransport