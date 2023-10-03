'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class schedule extends Model {
        static associate(models) {
            // define association here
        }
    };
    schedule.init({
        scheduleId: {
            type: DataTypes.INTEGER,
            primaryKey: true, // Đặt trường này là khóa chính
            autoIncrement: true, // Tự động tăng giá trị
        },
        curentNumber: DataTypes.INTEGER,
        maxNumber: DataTypes.INTEGER,
        date: DataTypes.DATE,
        timeType: DataTypes.STRING,
        docterId: DataTypes.INTEGER,
    }, {
        sequelize,
        modelName: 'schedule',
    });
    return schedule;
};
