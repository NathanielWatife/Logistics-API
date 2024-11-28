'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    static associate(models) {
      // Associate Vehicle with Driver
      Vehicle.hasOne(models.Driver, {
        foreignKey: 'vehicle_id',
        as: 'driver',
      });
    }
  }

  Vehicle.init(
    {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      model: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      license_plate: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure license plates are unique
        validate: {
          notEmpty: true,
        },
      },
      capacity: {
        type: DataTypes.JSON, // Example: { weight: 1000, volume: { length: 200, width: 150, height: 100 } }
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: 'Vehicle',
      tableName: 'vehicles',
      timestamps: true,
    }
  );

  return Vehicle;
};
