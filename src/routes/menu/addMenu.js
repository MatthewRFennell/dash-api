const db = require('../../db')

const addMenu = (req, res) => {
  db.Itinerary.findOne({
    where: {
      itinerary_id: req.body.itinerary_id,
    }
  }).then(itinerary => {
    db.Menu.create({
      caterer: req.body.caterer,
      image: req.body.image || null,
    }).then((menu) => {
      menu.setItinerary(itinerary)
      req.body.courses.forEach(course => {
        db.Course.create({
          name: course.name,
        })
          .then(courseDB => {
            courseDB.setMenu(menu)
            course.dishes.forEach(dish => {
              db.Dish.create(dish)
                .then(dishDB => {
                  dishDB.setCourse(courseDB)
                })
                .catch(err => {
                  console.log(err)
                  res.status(400)
                  res.send({
                    success: false,
                    message: 'Failed to add a dish!'
                  })
                })
            })
          })
          .catch(err => {
            console.log(err)
            res.status(400)
            res.send({
              success: false,
              message: 'Failed to add a course'
            })
          })
      })
      res.status(200)
      res.send({
        success: true
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