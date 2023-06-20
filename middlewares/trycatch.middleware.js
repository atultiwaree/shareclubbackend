const utils = require("../helpers/utility.helper");
const messageObject = require("../helpers/messageConstants.helper");

module.exports.asyncTryCatchMiddleware = (handler) => {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (e) {
      console.log("::::::::::::::Caught Inside Error::::::::::::");
      console.log("Message\n", e.message, "MyStack\n", e.stack);
      return res.json(utils.createErrorResponse(messageObject.Error));
    }
  };
};
