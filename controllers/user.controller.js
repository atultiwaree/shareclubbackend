const messageObject = require("../helpers/messageConstants.helper");
const utils = require("../helpers/utility.helper");
const { userModel } = require("../models/user.model");
const { reqModel } = require("../models/requirement.model");

//OAuth Purpose
const admin = require("firebase-admin");
const serviceAccount = require("../credentials.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// module.exports.test = async (req, res) => {
//   console.log("Request Body", req.body.whatsappNumber);
//   console.log("Request Files", req.files);
//   console.log("Request USer", req.headers.token);
//   let x = utils.verifyToken(req.headers.token, process.env.SECRET_KEY);
//   console.log("XXXXXXXXXXXXXXX", x);
//   return res.json(utils.createSuccessResponse("fuck"));
// };

module.exports.googleAuth = async (req, res) => {
  if (req.params) {
    if (req.headers?.authtoken) {
      const authUser = await admin.auth().verifyIdToken(req.headers.authtoken);
      const { uid, name, email, picture } = authUser;
      if (uid === req.params?.uid) {
        let isPresentAlready = await userModel.findOne({ uid: uid });
        if (isPresentAlready) {
          const token = utils.generateToken({ deviceId: req.body.deviceId, deviceModle: req.body.deviceModle, guid: uid }, process.env.SECRET_KEY);
          console.log("Gen Token", token);
          return res
            .status(200)
            .json(utils.createSuccessResponse("User login", { id: isPresentAlready._id, token, verification: isPresentAlready.verification, active: isPresentAlready.active })); //Directly send token
        } else {
          let saveToDB = await userModel({ uid, name, email, picture, deviceId: req.body.deviceId, deviceModel: req.body.deviceModel }).save();
          if (saveToDB) {
            const token = utils.generateToken({ deviceId: req.body.deviceId, deviceModle: req.body.deviceModle, guid: uid }, process.env.SECRET_KEY);
            console.log("Gen Token", token);
            return res.status(200).json(utils.createSuccessResponse("User Signup", { id: saveToDB._id, token, verification: saveToDB.verification, active: saveToDB.active })); //Directly send token
          } else return res.status(401).json(utils.createErrorResponse(messageObject.Error));
        }
      } else return res.status(401).json(utils.createErrorResponse(messageObject.userIdDoesnotMatch));
    } else return res.status(401).json(utils.createErrorResponse(messageObject.authTokenRequired));
  } else return res.status(401).json(utils.createErrorResponse(messageObject.uidRequired));
};

/**
 * !If Alredy Verified check has to be implemented
 * !Check for if number already exist
 */

module.exports.verifyAccount = async (req, res) => {
  let media = Object.assign([]);
  if (req.params.id) {
    let userExist = await userModel.findById({ _id: req.params.id });
    if (userExist) {
      if (!userExist.verified) {
        if (req?.files && req.files.length >= 1) {
          req.files.forEach((x) => {
            media.push({
              imageType: x.mimetype, //!Could have implemented test case here for media checkig type image | video.
              path: x.path,
            });
          });
          userExist["verificationDocs"] = media;
          userExist["verification"] = true;
          userExist["whatsappNumber"] = req.body.whatsappNumber;
          userExist["typeOfUser"] = "seller";
          userExist.save().catch((e) => console.log("VerifyAccount Save Error", e.message));
          return res.status(200).json(utils.createSuccessResponse(messageObject.verificationPending, { verification: true }));
        } else return res.status(401).json(utils.createErrorResponse(messageObject.fileIsRequiredField));
      } else return res.status(401).json(utils.createErrorResponse(messageObject.alreadyVerified));
    } else return res.status(401).json(utils.createErrorResponse(messageObject.userIdDoesnotMatch));
  } else return res.status(401).json(utils.createErrorResponse(messageObject.requiredIdToVerify));
};

module.exports.accountActiveStatus = async (req, res) => {
  return res.status(200).json(utils.createSuccessResponse(messageObject.accountStatus, { active: req.user.active }));
};

module.exports.requirementFeeder = async (req, res) => {
  const findUser = await userModel.findById({ _id: req.params.id });
  if (findUser) {
    if (req.body?.requirement) {
      let x = await reqModel({ user: req.user._id, requirement: req.body.requirement }).save();
      console.log(x);
      if (req.body?.whatsappNumber) {
        if (!req.user?.whatsappNumber) {
          await userModel.updateOne({ _id: req.user._id }, { whatsappNumber: req.body.whatsappNumber });
          return res.status(200).json(utils.createSuccessResponse(messageObject.addRequestSuccessFully));
        } else return res.status(200).json(utils.createSuccessResponse(messageObject.addedRequestSuccessfully));
      } else return res.status(400).json(utils.createErrorResponse("Whatsapp number is required field"));
    } else return res.status(400).json(utils.createErrorResponse("Requiremen is required field"));
  } else return res.status(404).json(utils.createErrorResponse(messageObject.userNotExist));
};
