const messageObject = {
  success: "Request success",
  Error: "Error something went wrong.",
  uidRequired: "UID not present in params",
  authTokenRequired: "Auth token required",
  userIdDoesnotMatch: "UserId and Token uid not matched",
  loginSignupFailed: "Failed to signin/signup",
  requiredIdToVerify: "Something went wrong, try again later",
  fileIsRequiredField: "Please provide all 3 verification documents ",
  tokenRequired: "Please provide token",
  somethingWentWrong: "Something went wrong",
  sessionExpired: "Session expired please login again.",

  //!Verificaiton

  verificationPending: "Account activation status will be shared to your whatsapp shortly.",
  alreadyVerified: "Account is already verified",
  accountStatus: "Your account status",

  //!REquest
  userNotExist: "User not exist",
  addedRequestSuccessfully: "Your request was added successfully",

  //!Dummy
  isRequired: "is required field",

  //!Product
  productListedSuccessfully: "Product listed successfully",
};
module.exports = messageObject;
