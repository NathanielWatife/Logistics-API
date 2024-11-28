'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Vehicle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define association with Driver
      Vehicle.hasOne(models.Driver, {
        foreignKey: 'vehicle_id', // Driver table should have a vehicle_id column
        as: 'driver', // Alias for the association
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
        type: DataTypes.JSON,
        allowNull: true, // Optional field
      },
    },
    {
      sequelize,
      modelName: 'Vehicle',
      tableName: 'vehicles', // Explicit table name
      timestamps: true, // Enables createdAt and updatedAt columns
    }
  );

  return Vehicle;
};
