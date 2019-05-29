const db = require('../db')

const events = (req, res) => {
  if(!req.user){
    res.staus(400)
    res.send({
      success : false
    })
    return
  }

  db.sequelize.sync().then(() =>
    db.Event.findAll({
      include: [{
        model: db.Account,
        where: {account_id : req.user.account_id}
      }]
    })
      .then(results => {
        res.status(200)
        res.send({
          success: true,
          events: results
        })
      })
      .catch(err => {
        console.log(err)
        res.status(500)
        res.send({
          success: false
        })
      })
  )  
}
  
module.exports = events