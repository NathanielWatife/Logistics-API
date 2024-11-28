'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Define any relationships if needed in the future
    }
  }

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true, // Ensures name is not empty
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Email must be unique
        validate: {
          isEmail: true, // Ensures valid email format
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8, 100], // Password must be between 8 and 100 characters
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          is: /^\+?[1-9]\d{1,14}$/i, // Optional: Validate E.164 phone number format
        },
      },
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'users',
      timestamps: true,
    }
  );

  return User;
};
