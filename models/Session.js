const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Session extends Model {}

Session.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      },
    },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'session',
  }
);

module.exports = Session;