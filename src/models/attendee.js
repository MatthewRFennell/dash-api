const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Attendee extends Sequelize.Model { }
  Attendee.init({
    attendee_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    diet: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'attendee'
  })
  return Attendee
}