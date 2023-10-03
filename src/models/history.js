'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class history extends Model {
        static associate(models) {
            // define association here
        }
    };
    history.init({
        historyId: {
            type: DataTypes.INTEGER,
            primaryKey: true, // Đặt trường này là khóa chính
            autoIncrement: true, // Tự động tăng giá trị
        },
        pationId: DataTypes.INTEGER,
        docterId: DataTypes.INTEGER,
        description: DataTypes.TEXT,
        files: DataTypes.TEXT,

    }, {
        sequelize,
        modelName: 'history',
    });
    return history;
};
