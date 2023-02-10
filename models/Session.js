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
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      foreignKey: true,
      },
    session_start:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    session_end:{
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'session',
  }
);

module.exports = Session;