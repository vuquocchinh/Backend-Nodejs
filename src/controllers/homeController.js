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
module.exports = { 
    getHomePage: getHomePage
}
