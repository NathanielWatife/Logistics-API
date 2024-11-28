'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    static associate(models) {
      // Associate Driver with Vehicle
      Driver.belongsTo(models.Vehicle, {
        foreignKey: 'vehicle_id',
        as: 'vehicle',
      });
    }
  }

  Driver.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: /^\+?[1-9]\d{1,14}$/i, // Validate E.164 phone number format
        },
      },
      license_number: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // Ensure unique license number
        validate: {
          notEmpty: true,
        },
      },
      vehicle_id: {
        type: DataTypes.INTEGER,
        allowNull: true, // Driver can exist without a vehicle
      },
    },
    {
      sequelize,
      modelName: 'Driver',
      tableName: 'drivers',
      timestamps: true,
    }
  );

  return Driver;
};
