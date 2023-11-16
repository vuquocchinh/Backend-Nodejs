import db from "../models/index"
import bcrypt from 'bcryptjs';
let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            let isExit = await checkUserEmail(email);
            if (isExit) {
                let user = await db.User.findOne({
                    attributes: ['email', 'roleId', 'password'],
                    where: { email: email },
                    raw: true,
                });
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';
                        delete user.password;
                        userData.user = user;
                    }
                    else {
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                }

                else {
                    userData.errCode = 2;
                    userData.errMessage = ' User is not found';
                }
            }
            else {
                userData.errCode = 1;
                userData.errMessage = 'Your email is not found';
            }
            resolve(userData);
        }


        catch (e) {
            reject(e);
        }
    });
}
let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail },
            })
            if (user) {
                resolve(true);
            }
            else {
                resolve(false);
            }
        } catch (e) {
            reject(e);

        }
    })
}
let compareUserPassword = (password, hashPasswordFromDB) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await bcrypt.compareSync(password, hashPasswordFromDB);
            resolve(check);
        } catch (e) {
            reject(e);
        }
    })
}
let getAllUsers = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = 'test';
            if (userId === 'ALL') {
                users = await db.User.findAll({
                    attributes: {
                        exclude: ['password']
                    }

                }); // nếu userId = ALL thì trả về tất cả user
            }
            if (userId && userId !== 'ALL') {
                users = await db.User.findOne({
                    where: { userId: userId },
                    attributes: {
                        exclude: ['password']
                    }
                    // nếu userId khác ALL thì trả về user có userId đó
                });

            }
            resolve(users);

        } catch (e) {
            reject(e);

        }
    })

}
const salt = bcrypt.genSaltSync(10);
let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (e) {
            reject(e);
        }
    })
}
let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            //check email is exist or not
            let check = await checkUserEmail(data.email);
            if (check === true) {
                resolve({
                    errCode: 1,
                    errMessage: 'Your email is already in used, please try another email'
                })
            }
            else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPasswordFromBcrypt,
                    fullName: data.fullName,
                    address: data.address,
                    phoneNumber: data.phoneNumber,
                    gender: data.gender === '1' ? true : false,
                    roleId: data.roleId,
                    Image: data.Image,
                })
            }


            resolve({
                errCode: 0,
                message: 'OK'
            })
        }
        catch (e) {
            reject(e);
        }
    })
}
let deleteUser = (userId) => {
    return new Promise(async (resolve, reject) => {
        let user = await db.User.findOne({
            where: { userId: userId }
        })
        if (!user) {
            resolve({
                errCode: 2,
                errMessage: 'The user is not exist'
            })
        }
        await db.User.destroy({
            where: { userId: userId }
        })
        resolve({
            errCode: 0,
            message: 'The user is deleted'
        })
    })
}
let updateUserData = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.userId) {
                resolve({
                    errCode: 2,
                    errMessage: 'Missing required parameter'
                })
            }
            let user = await db.User.findOne({
                where: { userId: data.userId },
                raw: false
            })
            if (user) {
                user.fullName = data.fullName;
                user.address = data.address;
                user.email = data.email;
                await user.save();
                resolve({
                    errCode: 0,
                    message: 'Update user success'
                });
            } else {
                resolve({
                    errCode: 1,
                    errMessage: 'User not found'
                })
            }
        }
        catch (e) {
            reject(e);
        }
    })
}


module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers,
    createNewUser: createNewUser,
    deleteUser: deleteUser,
    updateUserData: updateUserData
}