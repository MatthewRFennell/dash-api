/*global __dirname */

const Sequelize = require('sequelize')

const sequelize = new Sequelize('postgres://g1827124_u:RcpqcbAwaY@db.doc.ic.ac.uk:5432/g1827124_u?ssl=true')

const Account = sequelize.import(__dirname + '/models/account')
const Event = sequelize.import(__dirname + '/models/event')
const Attendee = sequelize.import(__dirname + '/models/attendee')

Event.belongsTo(Account)
Account.hasMany(Event)

Attendee.belongsTo(Event)
Event.hasMany(Attendee)

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

sequelize.sync()

const db = {
  Account : Account,
  Event: Event,
  Attendee: Attendee,
  sequelize : sequelize
}

module.exports = db