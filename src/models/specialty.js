'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class specialty extends Model {
        static associate(models) {
            // define association here
        }
    };
    specialty.init({
        specialtyId: {
            type: DataTypes.INTEGER,
            primaryKey: true, // Đặt trường này là khóa chính
            autoIncrement: true, // Tự động tăng giá trị
        },
        description: DataTypes.TEXT,
        image: DataTypes.STRING,
        name: DataTypes.STRING,

    }, {
        sequelize,
        modelName: 'specialty',
    });
    return specialty;
};
