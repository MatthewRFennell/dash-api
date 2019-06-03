/*global __dirname process */

const Sequelize = require('sequelize')

const password = process.env.db_password
const user = process.env.db_user
const database = process.env.db_database
const domain = process.env.db_domain
const port = process.env.db_port

const sequelize = new Sequelize(`postgres://${user}:${password}@${domain}:${port}/${database}?ssl=true`)

const Account = sequelize.import(__dirname + '/models/account')
const Event = sequelize.import(__dirname + '/models/event')
const Attendee = sequelize.import(__dirname + '/models/attendee')
const Transport = sequelize.import(__dirname + '/models/transport')
const Itinerary = sequelize.import(__dirname + '/models/itinerary')

Event.belongsTo(Account)
Account.hasMany(Event)

Attendee.belongsTo(Event)
Event.hasMany(Attendee)

Attendee.hasOne(Transport)
Transport.belongsTo(Attendee)

Event.hasMany(Itinerary)
Itinerary.belongsTo(Event)

sequelize.sync()

const db = {
  Account : Account,
  Event: Event,
  Attendee: Attendee,
  Transport: Transport,
  Itinerary: Itinerary,
  sequelize : sequelize
}

module.exports = db
