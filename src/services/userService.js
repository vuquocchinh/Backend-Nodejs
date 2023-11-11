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
                });
                if (user) {
                    let check = await bcrypt.compareSync(password, user.password);
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';
                        delete user.dataValues.password;
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
                raw: true,
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
module.exports = {
    handleUserLogin: handleUserLogin
}