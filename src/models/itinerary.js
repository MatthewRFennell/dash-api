const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Itinerary extends Sequelize.Model { }
  Itinerary.init({
    itinerary_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
    },
    long: {
      type: DataTypes.FLOAT(6),
    },
    lat: {
      type: DataTypes.FLOAT(6),
    },
  }, {
    sequelize,
    modelName: 'itinerary'
  })
  return Itinerary
}