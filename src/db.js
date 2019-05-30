/*global __dirname */

const Sequelize = require('sequelize')

const sequelize = new Sequelize('postgres://g1827124_u:RcpqcbAwaY@db.doc.ic.ac.uk:5432/g1827124_u?ssl=true')

const Account = sequelize.import(__dirname + '/models/account')
const Event = sequelize.import(__dirname + '/models/event')
const Attendee = sequelize.import(__dirname + '/models/attendee')
const Transport = sequelize.import(__dirname + '/models/transport')

Event.belongsTo(Account)
Account.hasMany(Event)

Attendee.belongsTo(Event)
Event.hasMany(Attendee)

Event.hasOne(Transport)
Transport.belongsTo(Event)

const db = {
  Account : Account,
  Event: Event,
  Attendee: Attendee,
  Transport: Transport,
  sequelize : sequelize
}

module.exports = db
