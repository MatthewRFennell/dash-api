const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Transport extends Sequelize.Model { }
  Transport.init({
    transport_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    operator: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    vessel_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    departTime: {
      type: 'TIMESTAMP',
      allowNull: false,
    },
    departFrom: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    arriveAt: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'transport'
  })
  return Transport
}