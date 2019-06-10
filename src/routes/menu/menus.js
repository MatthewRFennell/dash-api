const db = require('../../db')

const menus = (req, res) => {
  db.Menu.findAll({
    include: [
      {
        model: db.Course,
        include: [db.Dish]
      }
    ]
  })
    .then(menus => {
      res.status(200)
      res.send({
        success: true,
        menus
      })
    })
    .catch(err => {
      console.log(err)
      res.status(400)
      res.send({
        success: false,
        message: 'Error retrieving menus!'
      })
    })
}

module.exports = menus