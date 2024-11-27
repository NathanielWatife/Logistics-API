const bcrypt = require('bcrypt');
const { DataTypes } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true},
    password: DataTypes.STRING,
    phone: DataTypes.STRING
  });

  User.protytpe.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };
  return User;
};