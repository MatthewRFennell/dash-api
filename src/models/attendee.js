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
    },
    confirmed: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    form_id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4
    },
  }, {
    sequelize,
    modelName: 'attendee'
  })
  return Attendee
}