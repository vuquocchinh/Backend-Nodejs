'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Doctor_Clinic_Specialty extends Model {
        static associate(models) {
            // define association here
        }
    };
    Doctor_Clinic_Specialty.init({
        Doctor_Clinic_SpecialtyId: {
            type: DataTypes.INTEGER,
            primaryKey: true, // Đặt trường này là khóa chính
            autoIncrement: true, // Tự động tăng giá trị
        },
        doctorId: DataTypes.INTEGER,
        clinicId: DataTypes.INTEGER,
        specialtyId: DataTypes.INTEGER,


    }, {
        sequelize,
        modelName: 'Doctor_Clinic_Specialty',
    });
    return Doctor_Clinic_Specialty;
};
