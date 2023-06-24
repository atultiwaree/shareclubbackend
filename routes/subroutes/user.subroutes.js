const express = require("express");
const userController = require("../../controllers/user.controller");
const messageObject = require("../../helpers/messageConstants.helper");
const utils = require("../../helpers/utility.helper");
const routes = express.Router();
const goThroughTryCatchMiddleware = require("../../middlewares/trycatch.middleware").asyncTryCatchMiddleware;
const uploads = require("../../middlewares/multer.middleware");

const verfifyMiddleware = require("../../middlewares/verification.middleware");

//Test Route
routes.post("/", (req, res) => {
  console.log(req.body.name);
  console.log(req.headers.auth);
  return res.json(utils.createSuccessResponse(messageObject.success));
});

//Gonna be used routes
routes.post("/googleauth/:uid", goThroughTryCatchMiddleware(userController.googleAuth));
routes.post("/verify/:id", verfifyMiddleware, uploads.array("verificationMedia"), goThroughTryCatchMiddleware(userController.verifyAccount));
routes.get("/status/:id", verfifyMiddleware, goThroughTryCatchMiddleware(userController.accountActiveStatus));
routes.post("/requirement/:id", verfifyMiddleware, goThroughTryCatchMiddleware(userController.requiremtnFeeder));

routes.post("/test", uploads.array("verificationMedia"), goThroughTryCatchMiddleware(userController.test));

module.exports = routes;
