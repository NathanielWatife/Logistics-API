'use strict';
module.exports = (sequelize, DataTypes) => {
  const Payment = sequelize.define('Payment', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true, // Optional for anonymous payments
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true, // Optional for anonymous payments
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    reference: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    method: {
      type: DataTypes.ENUM('paystack', 'stripe', 'bank_transfer'),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'verified', 'failed'),
      allowNull: false,
      defaultValue: 'pending',
    },
    bank_details: {
      type: DataTypes.STRING, // Only for bank transfers
      allowNull: true,
    },
  });
  return Payment;
};
