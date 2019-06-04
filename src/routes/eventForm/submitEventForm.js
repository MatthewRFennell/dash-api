const db = require('../../db')

const submitEventForm = (req, res) => {
  if (!req.body.form_id) {
    res.status(400)
    res.send({
      success: false,
      message: 'Missing form id!'
    })
    return
  }
  db.Event.findOne({
    where: { form_id: req.body.form_id }
  })
    .then(event => {
      if (event === null) throw new Error('Form id not found!')
      db.Attendee.create({
        fname: req.body.fname,
        sname: req.body.sname,
        diet: req.body.diet,
        confirmed: false,
      }).then((attendee) => {
        attendee.setEvent(event)
        res.status(200)
        res.send({
          success: true,
        })
      })
        .catch(err => {
          console.log(err)
          res.status(400)
          res.send({
            success: false,
            message: 'Missing attendee information!'
          })
        })
    })
    .catch(err => {
      console.log(err)
      res.status(400)
      res.send({
        success: false,
        message: 'Incorrect form id!'
      })
    })
}

module.exports = submitEventForm