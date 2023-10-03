'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Detailschedule extends Model {
        static associate(models) {
            // define association here
        }
    };
    Detailschedule.init({
        detailscheduleId: {
            type: DataTypes.INTEGER,
            primaryKey: true, // Đặt trường này là khóa chính
            autoIncrement: true, // Tự động tăng giá trị
        },
        key: DataTypes.STRING,
        type: DataTypes.STRING,
        descriptionEn: DataTypes.STRING,
        descriptionVi: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Detailschedule',
    });
    return Detailschedule;
};
