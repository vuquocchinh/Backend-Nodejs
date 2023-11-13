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
module.exports = {
    handleUserLogin: handleUserLogin,
    getAllUsers: getAllUsers
}