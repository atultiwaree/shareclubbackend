const express = require("express");
const routes = express.Router();

//All sub routes import

const user_routes = require("./subroutes/user.subroutes");

routes.use("/user", user_routes);

module.exports = routes;
