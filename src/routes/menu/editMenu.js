const db = require('../../db')

const editMenu = (req, res) => {
  db.Menu.update({
    caterer: req.body.caterer,
    image: req.body.image || null,
  }, { where: { menu_id: req.body.menu_id } })
    .then(() => {
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


module.exports = editMenu