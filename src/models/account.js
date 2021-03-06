const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Account extends Sequelize.Model { }
  Account.init({
    account_id: {
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
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    logo_image: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'account'
  })
  return Account
}