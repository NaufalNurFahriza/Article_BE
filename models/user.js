'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Category, { foreignKey: 'userId' });
      User.hasMany(models.Article, { foreignKey: 'userId' });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    role: {
      type: DataTypes.ENUM('Admin', 'User'),
      defaultValue: 'User'
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};