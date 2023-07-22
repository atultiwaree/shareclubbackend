const JWT = require("jsonwebtoken");
const ObjectId = require("mongoose").Types.ObjectId;

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

module.exports.isValidObjectId = (id) => {
  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) return true;
    return false;
  }
  return false;
};

module.exports.sanitizeString = (str) => {
  str = str.replace(/[^a-z0-9áéíóúñü \,_-]/gim, "");
  return str.trim();
};
