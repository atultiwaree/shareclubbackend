const express = require("express");
const routes = express.Router();
const verfifyMiddleware = require("../../middlewares/verification.middleware");
const utils = require("../../helpers/utility.helper");
const messageObject = require("../../helpers/messageConstants.helper");
const goThroughTryCatchMiddleware = require("../../middlewares/trycatch.middleware").asyncTryCatchMiddleware;
const uploads = require("../../middlewares/multer.middleware");
const productController = require("../../controllers/product.controller");

//Test product Route
routes.get("/", (req, res) => {
  return res.json(utils.createSuccessResponse(messageObject.success));
});

routes.post("/add/:id", verfifyMiddleware, uploads.array("productImages"), goThroughTryCatchMiddleware(productController.addProduct));

//For the time being I'm not deleting the product I'll just

module.exports = routes;
