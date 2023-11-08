import bcrypt from 'bcryptjs'; // Sử dụng bcryptjs
import db from "../models/index";
import e from 'express';

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

let getUserinfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { userId: userId },
                raw: true,
            })
            if (user) {
                resolve(user);
            }
            else {
                resolve([]);
            }
        } catch (e) {
            reject(e);

        }
    })
}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({ // tìm user theo userId
                where: { userId: data.userId } //với điều kiện userId trùng với data.userId
            })
            if (user) { // nếu tìm thấy user thì cập nhật lại thông tin
                user.fullName = data.fullName;
                user.address = data.address;
                user.phoneNumber = data.phoneNumber;
                user.email = data.email;
                await user.save(); // lưu lại dữ liệu
                let allUsers = await db.User.findAll(); // lấy lại toàn bộ dữ liệu
                resolve(allUsers); // trả về cho client
            } else {
                resolve(allUsers);
            }

            await db.User.update({
            })

        } catch (e) {
            console.log(e);

        }
    }
    )
}
let deleteUserById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { userId: userId },
            })
            if (user) {
                await user.destroy();
            }
            resolve(); // trả về cho client

        } catch (e) {
            rejecte(e);

        }
    })
}
module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserinfoById: getUserinfoById,
    updateUserData: updateUserData,
    deleteUserById: deleteUserById,
}
