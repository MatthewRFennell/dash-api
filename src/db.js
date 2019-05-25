const Sequelize = require('sequelize')

const sequelize = new Sequelize('postgres://g1827124_u:RcpqcbAwaY@db.doc.ic.ac.uk:5432/g1827124_u?ssl=true')

const Test = sequelize.import(__dirname + '/models/test')

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

const db = {
  Test : Test,
  sequelize : sequelize
}

module.exports = db