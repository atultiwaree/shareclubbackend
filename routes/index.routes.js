const express = require("express");
const routes = express.Router();

//All sub routes import

const user_routes = require("./subroutes/user.subroutes");
const product_routes = require("./subroutes/product.subroutes");

routes.use("/user", user_routes);
routes.use("/product", product_routes);

module.exports = routes;
