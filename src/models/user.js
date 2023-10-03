'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  };
  User.init({
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Đặt trường này là khóa chính
      autoIncrement: true, // Tự động tăng giá trị
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    fullName: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    address: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    roleId: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    image: DataTypes.STRING,
    positionId: DataTypes.STRING,



  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
