import express, { Router } from "express";
import homecontroller from "../controllers/homecontroller";
let router = express.Router();
let initWebRoutes = (app) => {

    router.get("/", homecontroller.getHomePage);
    router.get('/crud', homecontroller.getCRUD);
    router.post('/post-crud', homecontroller.postCRUD);
    router.get('/get-crud', homecontroller.displayGetCRUD);

    return app.use("/", router);
}
module.exports = initWebRoutes;