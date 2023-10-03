import { json } from "body-parser";
import db from "../models/index";
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
    return res.send("Get CRUD from controller");
}
module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,

}
