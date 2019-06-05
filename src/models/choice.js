const Sequelize = require('sequelize')

module.exports = (sequelize) => {
  class Choice extends Sequelize.Model { }
  Choice.init({ }, {
    sequelize,
    modelName: 'choice'
  })
  return Choice
}
