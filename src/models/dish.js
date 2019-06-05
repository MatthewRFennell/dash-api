const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Dish extends Sequelize.Model { }
  Dish.init({
    dish_id: {
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
      allowNull: false,
    },
    warnings: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
  }, {
    sequelize,
    modelName: 'dish'
  })
  return Dish
}