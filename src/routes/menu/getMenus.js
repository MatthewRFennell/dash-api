const db = require('../../db')

const getMenus = (req, res) => {
  if (!req.query.form_id) {
    res.status(400)
    res.send({
      success: false,
      message: 'Missing form id!'
    })
    return
  }
  db.Attendee.findOne({
    where: { form_id: req.query.form_id },
  })
    .then(attendee => {
      if (attendee === null) throw new Error('Uuid not found!')
      db.Itinerary.findAll({
        where: { eventEventId: attendee.eventEventId },
        include: [
          {
            model: db.Menu,
            include: [
              {
                model: db.Course,
                include: [db.Dish]
              }
            ]
          }
        ]
      })
        .then(itineraries => {
          db.sequelize.query(`SELECT "dishDishId" FROM menuchoice WHERE "attendeeAttendeeId"=${attendee.attendee_id}`, {
            type: db.sequelize.QueryTypes.SELECT
          })
            .then(selectedDishIds => {
              const filteredItineraries = []
              for (const itinerary of itineraries) {
                const filteredItinerary = filterItinerary(itinerary, selectedDishIds)
                if (filteredItinerary) filteredItineraries.push(filteredItinerary)
              }
              res.status(200)
              res.send({
                success: true,
                attendee,
                itineraries: filteredItineraries
              })
            })
            .catch(err => {
              console.log(err)
              res.status(400)
              res.send({
                success: false,
                message: 'Failed to get already selected dishes!'
              })
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

const filterItinerary = (itinerary, dishIds) => {
  if (!itinerary.menu) return null
  const filteredCourses = []
  for (const course of itinerary.menu.courses) {
    const filteredCourse = filterCourse(course, dishIds)
    if (filteredCourse) filteredCourses.push(filteredCourse)
  }
  if (filteredCourses.length === 0) return null
  itinerary.menu = filteredCourses
  return itinerary
}

const filterCourse = (course, dishIds) => {
  for (const dish of course.dishes) {
    for (const dishId of dishIds) {
      if (dish.dish_id === dishId.dishDishId) {
        return null
      }
    }
  }
  return course
}

module.exports = getMenus