const db = require('../db')

const eventImage = (req, res) => {
  if (!req.user || !req.query.id) {
    res.status(400)
    res.send({
      success: false
    })
    return
  }
  db.Event.findOne({
    attributes: ['accountAccountId', 'image'],
    where: { event_id: req.query.id }
  })
    .then(result => {
      if (result === null) {
        throw new Error('Non existent event image requested.')
      }
      if (result.accountAccountId != req.user.dataValues.account_id) {
        throw new Error('User requested event image not belonging to them.')
      }
      res.status(200)
      res.send(result.image)
    })
    .catch(err => {
      console.log(err)
      res.status(400)
      res.send({
        success: false,
        message: 'Invalid event id!'
      })
    })
}

module.exports = eventImage