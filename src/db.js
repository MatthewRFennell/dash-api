/*global __dirname */

const Sequelize = require('sequelize')

// const password = process.env.db_password
// const user = process.env.db_user
// const database = process.env.db_database
// const domain = process.env.db_domain
// const port = process.env.db_port

const sequelize = new Sequelize('postgres://mcgkwfntpjrwsz:843ec9c146e2b09db374a6e35abe51242051e1f35eca3cb225aa7b0a83325bff@ec2-23-21-160-38.compute-1.amazonaws.com:5432/d608o4lr6u2jbn?ssl=true')

const Account = sequelize.import(__dirname + '/models/account')
const Event = sequelize.import(__dirname + '/models/event')
const Attendee = sequelize.import(__dirname + '/models/attendee')
const Transport = sequelize.import(__dirname + '/models/transport')
const Itinerary = sequelize.import(__dirname + '/models/itinerary')
const Menu = sequelize.import(__dirname + '/models/menu')
const Course = sequelize.import(__dirname + '/models/course')
const Dish = sequelize.import(__dirname + '/models/dish')

const userAccounts = [0]
const adminAccounts = [1]

const accountIsAdmin = (user, res) => {
  if (user.type !== null && !adminAccounts.includes(user.type)) {
    res.status(401)
    res.send({
      success: false,
      message: 'Unauthorized'
    })
    return false
  }
  return true
}

Event.belongsTo(Account)
Account.hasMany(Event)

Attendee.belongsTo(Event)
Event.hasMany(Attendee)

Attendee.hasOne(Transport)
Transport.belongsTo(Attendee)

Event.hasMany(Itinerary)
Itinerary.belongsTo(Event)

Itinerary.belongsTo(Menu)

Menu.hasMany(Course, { onDelete: 'CASCADE' })
Course.belongsTo(Menu)

Course.hasMany(Dish, { onDelete: 'CASCADE' })
Dish.belongsTo(Course)

sequelize.sync()

const db = {
  Account,
  Event,
  Attendee,
  Transport,
  Itinerary,
  Menu,
  Course,
  Dish,
  sequelize,
  userAccounts,
  adminAccounts,
  accountIsAdmin
}

module.exports = db
