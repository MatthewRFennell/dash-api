const db = require('../../db')

const setMenu = async (req, res) => {
  let itinerary
  try {
    itinerary = await db.Itinerary.findOne({
      where: {
        itinerary_id: req.body.itinerary_id,
      },
      include: [db.Menu]
    })
  } catch (err) {
    console.log(err)
    res.status(400)
    res.send({
      success: false,
      message: 'Database error getting itinerary!'
    })
    return
  }
  if (!itinerary) {
    res.status(400)
    res.send({
      success: false,
      message: 'This itinerary does not exist!'
    })
    return
  }
  // Link existing menu with itinerary
  let menu
  try {
    menu = await db.Menu.findOne({
      where: {
        menu_id: req.body.menu_id,
      }
    })
  } catch (err) {
    console.log(err)
    res.status(400)
    res.send({
      success: false,
      message: 'Database error getting menu!'
    })
    return
  }
  if (!menu) {
    res.status(400)
    res.send({
      success: false,
      message: 'This menu does not exist!'
    })
    return
  }
  if (itinerary.menuMenuId && itinerary.menuMenuId !== menu.menu_id) {
    //Already has a menu, delete choices if new one doesnt match
    try {
      await db.sequelize.query(`DELETE FROM menuchoice where "itineraryId"=${itinerary.itinerary_id}`)
    } catch (err) {
      console.log(err)
      res.status(400)
      res.send({
        success: false,
        message: 'Error deleting choices of old menu!'
      })
      return
    }
  }
  await itinerary.setMenu(menu)
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

module.exports = setMenu