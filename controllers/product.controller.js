const messageObject = require("../helpers/messageConstants.helper");
const utils = require("../helpers/utility.helper");
const { mixedProductModal } = require("../models/mixed_product.modal");
const { userModel } = require("../models/user.model");

//!Folder of multer has to be changed

module.exports.addProduct = async (req, res) => {
  const productObject = Object.assign({});
  const media = Object.assign([]);

  const findUser = await userModel.findById({ _id: req.params.id });

  if (findUser) {
    for (const i of ["category", "type", "title", "description", "price"]) {
      if (req.body[i]) {
        productObject[i] = req.body[i];
      } else return res.status(403).json(utils.createErrorResponse(`${i} ${messageObject.isRequired}`));
    }
    if (req.files?.length > 0) {
      req.files.forEach((x) => {
        media.push({
          imageType: x.mimetype, //!Could have implemented test case here for media checkig type image | video.
          path: x.path,
        });
      });
      productObject["user"] = findUser._id;
      productObject["productImages"] = media;
      const saveProductToDB = await mixedProductModal(productObject).save();
      if (saveProductToDB) {
        return res.status(200).json(utils.createSuccessResponse(messageObject.productListedSuccessfully));
      } else return res.status(403).json(utils.createErrorResponse(messageObject.somethingWentWrong));
    } else return res.status(403).json(utils.createErrorResponse(`Images ${messageObject.isRequired}`));
  } else return res.status(404).json(utils.createErrorResponse(messageObject.userNotExist));
};
