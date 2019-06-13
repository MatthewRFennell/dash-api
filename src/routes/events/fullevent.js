const db = require('../../db')

const fullevent = async (req, res) => {
  if (!req.query.event_id) {
    res.status(400)
    res.send({
      success: false,
      message: 'Missing event id!'
    })
    return
  }

  let event
  try {
    event = await db.Event.findOne({
      where: { event_id: req.query.event_id },
      order: [
        [db.Itinerary, 'start_date', 'ASC']
      ],
      include: [
        {
          model: db.Attendee,
          include: [db.Transport]
        },
        {
          model: db.Itinerary,
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
        }
      ]
    })
    if (event === null) {
      throw new Error('Non existent event requested')
    }
    if ((req.user.type && !db.adminAccounts.includes(req.user.type)) && event.accountAccountId != req.user.account_id) {
      throw new Error('User requested event not belonging to them')
    }
  } catch (err) {
    console.log(err)
    res.status(400)
    res.send({
      success: false,
      message: 'This event does not exist!'
    })
  }
  // Convert to plain to parse menu choices
  const plainEvent = JSON.parse(JSON.stringify(event))
  if (plainEvent.attendees.length > 0) {
    const eventAttendees = plainEvent.attendees.map(a => a.attendee_id)
    let selectedDishIds
    try {
      selectedDishIds = await db.sequelize.query(`SELECT * FROM menuchoice WHERE "attendeeId" IN (${eventAttendees})`, {
        type: db.sequelize.QueryTypes.SELECT
      })
    } catch (err) {
      console.log(err)
      res.status(400)
      res.send({
        success: false,
        message: 'Error retrieving menu choices'
      })
    }
    for (const attendee of plainEvent.attendees) {
      attendee.menuchoices = []
      attendee.menuscompleted = true
      for (const itinerary of plainEvent.itineraries) {
        if (itinerary.menu) {
          if (!itinerary.menu.hasOwnProperty('notChosen')) {
            itinerary.menu.notChosen = 0
          }
          const itineraryChoice = {
            name: itinerary.name,
            description: itinerary.description,
            courses: [],
            completed: true
          }
          attendee.menuchoices.push(itineraryChoice)
          for (const course of itinerary.menu.courses) {
            if (!course.hasOwnProperty('notChosen')) {
              course.notChosen = 0
            }
            const courseChoice = {
              name: course.name,
              choice: getCourseChoice(attendee, itinerary, course, selectedDishIds),
              completed: true
            }
            if (courseChoice.choice === null) {
              courseChoice.completed = false
              itineraryChoice.completed = false
              attendee.menuscompleted = false
              course.notChosen++
            }
            itineraryChoice.courses.push(courseChoice)
          }
          if (!itineraryChoice.completed) {
            itinerary.menu.notChosen++
          }
        }
      }
    }
  }
  res.status(200)
  res.send({
    success: true,
    event: plainEvent,
  })
}

const getCourseChoice = (attendee, itinerary, course, dishIds) => {
  for (const dish of course.dishes) {
    if (!dish.hasOwnProperty('chosen')) {
      dish.chosen = 0
    }
    for (const dishChoice of dishIds) {
      if (attendee.attendee_id === dishChoice.attendeeId &&
        itinerary.itinerary_id === dishChoice.itineraryId &&
        dish.dish_id === dishChoice.dishId) {
        dish.chosen++
        return dish
      }
    }
  }
  return null
}

module.exports = fullevent