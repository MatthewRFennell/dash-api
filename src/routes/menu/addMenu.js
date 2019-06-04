const db = require('../../db')

const addMenu = (req, res) => {
  db.Itinerary.findOne({
    where: {
      itinerary_id: req.body.itinerary_id,
    }
  }).then(itinerary => {
    db.Menu.create({
      caterer: req.body.caterer,
      items: req.body.items,
      contains: req.body.contains,
      price: req.body.price || null,
      image: req.body.image || null,
    }).then((menu) => {
      return menu.setItinerary(itinerary)
    })
      .then((menu) => {
        res.status(200)
        res.send({
          success: true,
          menu
        })
      }).catch((err) => {
        console.log(err)
        res.status(400)
        res.send({
          success: false,
          message: 'Failed to add Menu'
        })
      })
  }).catch((err) => {
    console.log(err)
    res.status(400)
    res.send({
      successs: false,
      message: 'Itinerary does not exists'
    })
  })

}

module.exports = addMenu