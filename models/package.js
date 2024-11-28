'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Package extends Model {
    static associate(models) {
      // Define any relationships in the future if needed
    }
  }

  Package.init(
    {
      weight: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: true, // Must be a valid float
          min: 0.1, // Minimum weight
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true, // Must be an integer
          min: 1, // Minimum quantity
        },
      },
      pickup_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      delivery_address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          isFloat: true,
          min: 0.0,
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Pending', // Default status
        validate: {
          isIn: [['Pending', 'In Transit', 'Delivered']], // Status must be one of these values
        },
      },
    },
    {
      sequelize,
      modelName: 'Package',
      tableName: 'packages',
      timestamps: true,
    }
  );

  return Package;
};
