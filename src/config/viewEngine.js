import express from "express";
let configViewEngine = (app) => {
    app.use(express.static("./src/public"));
    app.set("view engine", "ejs"); //jps, balde 
    app.set("views", "./src/views");
} 
module.exports = configViewEngine;