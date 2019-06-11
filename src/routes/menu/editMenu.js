const db = require('../../db')

const editMenu = async (req, res) => {
  if (!db.accountIsAdmin(req.user, res)) {
    return
  }
  let menu
  try {
    menu = await db.Menu.findOne({
      where: {
        menu_id: req.body.menu_id
      },
    })
  } catch (err) {
    console.log(err)
    res.status(400)
    res.send({
      success: false,
      message: 'This menu does not exist!'
    })
    return
  }
  if (menu) {
    try {
      await menu.update({
        caterer: req.body.caterer,
        image: req.body.image || null,
      })
    } catch (err) {
      console.log(err)
      res.status(400)
      res.send({
        success: false,
        message: 'Error updating menu!'
      })
      return
    }
    let courses
    try {
      courses = await db.Course.findAll({
        where: {
          menuMenuId: menu.menu_id
        }
      })
    } catch (err) {
      console.log(err)
      res.status(400)
      res.send({
        success: false,
        message: 'Error fetching courses!'
      })
      return
    }
    for (const course of courses) {
      if (!courseExists(course, req.body.courses)) {
        await course.destroy()
      }
    }
    for (const course of req.body.courses) {
      if (course.course_id) {
        // Update existing course
        let updatedCourseDB
        try {
          updatedCourseDB = await db.Course.findOne({
            where: {
              course_id: course.course_id
            },
          })
        } catch (err) {
          console.log(err)
          res.status(400)
          res.send({
            success: false,
            message: 'Error updating courses!'
          })
          return
        }
        if (updatedCourseDB) {
          await updatedCourseDB.update({
            name: course.name
          })
        } else {
          res.status(400)
          res.send({
            success: false,
            message: 'Error updating courses!'
          })
          return
        }
        let existingDishes
        try {
          existingDishes = await db.Dish.findAll({
            where: {
              courseCourseId: updatedCourseDB.course_id
            }
          })
        } catch (err) {
          console.log(err)
          res.status(400)
          res.send({
            success: false,
            message: 'Error finding existing dishes!!'
          })
          return
        }
        for (const existingDish of existingDishes) {
          if (!dishExists(existingDish, course.dishes)) {
            await existingDish.destroy()
          }
        }
        for (const newDish of course.dishes) {
          if (newDish.dish_id) {
            // Update dish
            try {
              await db.Dish.update({
                name: newDish.name,
                description: newDish.description,
                warnings: newDish.warnings
              }, { where: { dish_id: newDish.dish_id } })
            } catch (err) {
              console.log(err)
              res.status(400)
              res.send({
                success: false,
                message: 'Error updating dish!'
              })
              return
            }
          } else {
            // Add new dish
            try {
              await db.Dish.create({
                name: newDish.name,
                description: newDish.description,
                warnings: newDish.warnings,
                courseCourseId: updatedCourseDB.course_id
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
          }
        }
      } else {
        // Add new course
        let newCourse
        try {
          newCourse = await db.Course.create({
            name: course.name,
            menuMenuId: menu.menu_id
          })
        } catch (err) {
          console.log(err)
          res.status(400)
          res.send({
            success: false,
            message: 'Failed to add new course!'
          })
          return
        }
        for (const dish of course.dishes) {
          try {
            await db.Dish.create({
              name: dish.name,
              description: dish.description,
              warnings: dish.warnings,
              courseCourseId: newCourse.course_id
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
        }
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
        res.status(400)
        res.send({
          success: false,
          message: 'Database error, failed to retrieve new menu'
        })
        return
      })
  } else {
    res.status(400)
    res.send({
      success: false,
      message: 'This menu does not exist!'
    })
    return
  }
}

const courseExists = (course, newCourses) => {
  for (const newCourse of newCourses) {
    console.log(newCourse.course_id)
    console.log(course.course_id)
    if (newCourse.course_id && newCourse.course_id === course.course_id) return true
  }
  return false
}

const dishExists = (dish, newDishes) => {
  for (const newDish of newDishes) {
    if (newDish.dish_id && newDish.dish_id === dish.dish_id) return true
  }
  return false
}


module.exports = editMenu