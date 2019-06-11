const db = require('../../db')

const addMenu = async (req, res) => {
  if (!db.accountIsAdmin(req.user, res)) {
    return
  }
  let menu
  try {
    menu = await db.Menu.create({
      caterer: req.body.caterer,
      image: req.body.image || null,
    })
  } catch (err) {
    console.log(err)
    res.status(400)
    res.send({
      success: false,
      message: 'Error adding menu!'
    })
    return
  }
  for (const course of req.body.courses) {
    try {
      const courseDB = await db.Course.create({
        name: course.name,
        menuMenuId: menu.menu_id,
      })
      const dishPromises = course.dishes.map(dish => {
        try {
          return db.Dish.create({
            name: dish.name,
            description: dish.description,
            warnings: dish.warnings,
            courseCourseId: courseDB.course_id
          })
        } catch (err) {
          console.log(err)
          res.status(400)
          res.send({
            success: false,
            message: 'Failed to add a dish!'
          })
          return
        }
      })
      await Promise.all(dishPromises)
    } catch (err) {
      console.log(err)
      res.status(400)
      res.send({
        success: false,
        message: 'Failed to add a course'
      })
      return
    }
  }
  db.Menu.findOne({
    include: [
      {
        model: db.Course,
        include: [db.Dish]
      }
    ],
    where: {
      menu_id: menu.menu_id
    }
  })
    .then(fullMenu => {
      res.status(200)
      res.send({
        success: true,
        menu: fullMenu,
      })
    })
    .catch(err => {
      console.log(err)
      res.status(200)
      res.send({
        success: true,
        message: 'Database error, failed to retrieve new menu'
      })
      return
    })
}

module.exports = addMenu