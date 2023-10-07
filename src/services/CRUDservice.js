import bcrypt from 'bcryptjs'; // Sử dụng bcryptjs
import db from "../models/index";

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                email: data.email,
                password: hashPasswordFromBcrypt,
                fullName: data.fullName,
                dateOfBirth: data.dateOfBirth,
                address: data.address,
                gender: data.gender === '1' ? true : false,
                roleId: data.roleId,
                phoneNumber: data.phoneNumber,
            })
            resolve("Success create a new user");

            console.log(data);
            console.log(hashPasswordFromBcrypt);
        } catch (e) {
            reject(e);
        }
    });

}

let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            // Sử dụng salt để mã hóa mật khẩu
            const hash = await bcrypt.hashSync(password, salt);

            resolve(hash); // Trả về mật khẩu đã được mã hóa
        } catch (e) {
            reject(e);
        }
    });
}
let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = await db.User.findAll({
                raw: true,
            });
            resolve(users);
        } catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
}
