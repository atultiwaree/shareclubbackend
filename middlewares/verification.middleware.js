const utils = require("../helpers/utility.helper");
const msgConstants = require("../helpers/messageConstants.helper");
const { userModel } = require("../models/user.model");

const verifyMid = async (req, res, next) => {
  if (req.headers.token) {
    const tokenData = utils.verifyToken(req.headers.token);
    let isIdValidMongoId = utils.isValidObjectId(req.params.id);

    if (isIdValidMongoId) {
      if (tokenData) {
        const userDetailFromDB = await userModel.findById({ _id: req.params.id });
        if (userDetailFromDB?.uid === tokenData?.guid) {
          if (userDetailFromDB?.deviceId === tokenData?.deviceId) {
            req.user = userDetailFromDB;

            next();
          } else return res.status(401).json(utils.createErrorResponse(msgConstants.sessionExpired));
        } else return res.status(401).json(utils.createErrorResponse(msgConstants.sessionExpired));
      } else return res.status(401).json(utils.createErrorResponse(msgConstants.sessionExpired));
    } else return res.status(403).json(utils.createErrorResponse(msgConstants.inValidUserId));
  } else return res.status(401).json(utils.createErrorResponse(msgConstants.tokenRequired));
};
module.exports = verifyMid;
