// Xóa biến trước khi khai báo lại

let getHomePage = (req, res) => {
    return res.render("homepage.ejs");
}
module.exports = { 
    getHomePage: getHomePage
}
