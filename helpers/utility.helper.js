const JWT = require("jsonwebtoken");

module.exports.createSuccessResponse = (message, data = null, success = true) => {
  return { success, message, data };
};

module.exports.createErrorResponse = (message, data = null, success = false) => {
  return { success, message, data };
};

module.exports.generateToken = (data) => JWT.sign(data, process.env.SECRET_KEY);

module.exports.verifyToken = (token) => {
  try {
    return JWT.verify(token, process.env.SECRET_KEY);
  } catch (err) {
    return false;
  }
};
