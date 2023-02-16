// User model defined
const { Model, DataTypes } = require('sequelize');
// Import bcrypt to hash passwords
const bcrypt = require('bcrypt');
// Import the connection to the database (connection.js)
const sequelize = require('../config/connection');

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      foreignKey: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1,20],
      },
    },
  },
  {
    hooks: {
    // Hashes the password before it is created
      beforeCreate: async (newUserData) => {
        // Takes two arguments: the password, and the number of times to hash it
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },
      // This will hash the password before it is updated
      beforeUpdate: async (updatedUserData) => {
        updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
        return updatedUserData;
      },
    },
    // Passes in our imported sequelize connection, the direct connection to our database
    sequelize,
    // Don't automatically create createdAt/updatedAt timestamp fields
    timestamps: false,
    // Don't pluralize name of database table
    freezeTableName: true,
    // Use underscores instead of camel-casing
    underscored: true,
    modelName: 'user',
  }
);
// Export the User model
module.exports = User;