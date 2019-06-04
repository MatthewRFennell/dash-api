const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Event extends Sequelize.Model { }
  Event.init({
    event_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    tickets: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING
    },
    blurb: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    form_id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4
    },
  }, {
    sequelize,
    modelName: 'event'
  })
  return Event
}