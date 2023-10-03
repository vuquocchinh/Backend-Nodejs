'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Booking extends Model {
        static associate(models) {
            // define association here
        }
    };
    Booking.init({
        bookingId: {
            type: DataTypes.INTEGER,
            primaryKey: true, // Đặt trường này là khóa chính
            autoIncrement: true, // Tự động tăng giá trị
        },
        statusId: DataTypes.STRING,
        doctorId: DataTypes.INTEGER,
        patienId: DataTypes.INTEGER,
        date: DataTypes.DATE,
        timeType: DataTypes.STRING

    }, {
        sequelize,
        modelName: 'Booking',
    });
    return Booking;
};
