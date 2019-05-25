const Sequelize = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Test extends Sequelize.Model { }
    Test.init({
        id: {
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
        }
    }, {
            sequelize,
            modelName: 'test'
        });
    return Test;
}