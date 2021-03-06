const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Menu extends Sequelize.Model { }
  Menu.init({
    menu_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    caterer: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'menu'
  })
  return Menu
}