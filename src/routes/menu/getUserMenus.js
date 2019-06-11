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
          const plainItineraries = JSON.parse(JSON.stringify(itineraries))
          console.log(plainItineraries)
          db.sequelize.query(`SELECT "dishId", "itineraryId" FROM menuchoice WHERE "attendeeId"=${attendee.attendee_id}`, {
            type: db.sequelize.QueryTypes.SELECT
          })
            .then(selectedDishIds => {
              const filteredItineraries = []
              for (const itinerary of plainItineraries) {
                const filteredItinerary = filterItinerary(itinerary, selectedDishIds)
                if (filteredItinerary) filteredItineraries.push(filteredItinerary)
              }
              db.Account.findOne({
                attributes: ['logo_image'],
                include: [{
                  model: db.Event,
                  where: {
                    event_id: attendee.eventEventId
                  }
                }],
              })
                .then(account => {
                  res.status(200)
                  res.send({
                    success: true,
                    logo_image: account.logo_image,
                    attendee,
                    itineraries: filteredItineraries
                  })
                })
                .catch(err => {
                  console.log(err)
                  res.status(400)
                  res.send({
                    success: false,
                    message: 'Failed to retrieve account that the attendee belongs to!'
                  })
                  return
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
    const filteredCourse = filterCourse(course, dishIds, itinerary.itinerary_id)
    if (filteredCourse) filteredCourses.push(filteredCourse)
  }
  if (filteredCourses.length === 0) return null
  itinerary.menu.courses = filteredCourses
  return itinerary
}

const filterCourse = (course, dishIds, itinerary_id) => {
  for (const dish of course.dishes) {
    for (const dishId of dishIds) {
      if (itinerary_id === dishId.itineraryId && dish.dish_id === dishId.dishId) {
        return null
      }
    }
  }
  return course
}

module.exports = getMenus