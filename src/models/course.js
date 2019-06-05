const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Course extends Sequelize.Model { }
  Course.init({
    course_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }, {
    sequelize,
    modelName: 'course'
  })
  return Course
}