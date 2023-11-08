import { json } from "body-parser";
import db from "../models/index";
import CRUDservice from "../services/CRUDservice";
import e from "express";
let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        console.log(data);
        return res.render("homepage.ejs",
            {
                data: JSON.stringify(data)
            });

    } catch (e) {
        console.log(e);

    }
}
let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}
let postCRUD = async (req, res) => {
    let message = await CRUDservice.createNewUser(req.body);// lấy các tham số mà client gửi lên server
    console.log(message);
    return res.send("post crud from server");
}
let displayGetCRUD = async (req, res) => {
    let data = await CRUDservice.getAllUser();
    console.log(data);
    return res.render("displayCRUD.ejs", {
        dataTable: data,
    });
}
let getEditCRUD = async (req, res) => {
    let userId = req.query.userId;
    if (userId) {
        let userData = await CRUDservice.getUserinfoById(userId);
        //check userData not found
        return res.render('editCRUD.ejs', {
            user: userData,

        });
        //let userData
    }
    else {
        return res.send("User not found");

    }
}
let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDservice.updateUserData(data);
    return res.render("displayCRUD.ejs", {
        dataTable: allUsers, // trả về cho client
    });
}
let deleteCRUD = async (req, res) => {
    let userId = req.query.userId;
    if (userId) {
        await CRUDservice.deleteUserById(userId);
        return res.send("delete a user successfully");
    }
    else {
        return res.send("user not found");
    }


}
module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}
