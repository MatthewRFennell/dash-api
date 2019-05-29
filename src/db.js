/*global __dirname */

const Sequelize = require('sequelize')

const sequelize = new Sequelize('postgres://g1827124_u:RcpqcbAwaY@db.doc.ic.ac.uk:5432/g1827124_u?ssl=true')

const Account = sequelize.import(__dirname + '/models/account')
const Event = sequelize.import(__dirname + '/models/event')

Event.belongsTo(Account)
Account.hasMany(Event)

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
  sequelize : sequelize
}

module.exports = db