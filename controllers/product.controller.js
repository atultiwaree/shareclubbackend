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

module.exports.getAllProducts = async (req, res) => {
  const userAddedProducts = await mixedProductModal.find({ user: req.user._id.toString() }).select({ user: 0, __v: 0 });
  if (userAddedProducts) {
    return res.status(200).json(utils.createSuccessResponse("Results found", { productsListedByUser: userAddedProducts }));
  } else return res.status(200).json(utils.createErrorResponse("Sorry, you have not added any product yet."));
};

module.exports.delistProduct = async (req, res) => {
  if (req.query.productId) {
    const isproductIdValid = utils.isValidObjectId(req.query.productId);
    if (isproductIdValid) {
      const isProductPresent = await mixedProductModal.findOne({ user: req.params.id, _id: req.query.productId });
      if (isProductPresent) {
        //!Reduced line of code from 5 to 1.
        isProductPresent["active"] = !isProductPresent.active;

        await isProductPresent.save();
        return res.status(200).json(utils.createSuccessResponse("Product successfully delisted"));
      } else return res.status(404).json(utils.createErrorResponse("Product not present"));
    } else return res.status(403).json(utils.createErrorResponse("Product id is not valid"));
  } else return res.status(403).json(utils.createErrorResponse("Product id not present"));
};

module.exports.getCategoryWiseProduct = async (req, res) => {
  //!Category :- Attire / Rooms / Books etc

  //!Type -> smallCase, Category -> Capitalised

  let limits = req.query.limits ?? 1;

  if (req.query.type) {
    console.log(req.query.type);

    const TypeProducts = await mixedProductModal
      .find({ category: req.params.category, type: req.query.type })
      .limit(limits)
      .select("-__v")
      .populate("user", "whatsappNumber -_id")
      .sort({ active: -1 });

    if (TypeProducts.length > 0) {
      return res.status(200).json(utils.createSuccessResponse("TypeOfProducts", { TypeProducts, limits }));
    } else return res.json(utils.createErrorResponse("We don't have products yet for this category, list one if you have"));
  } else {
    const products = await mixedProductModal.find({ category: req.params.category }).limit(limits).select("-__v").populate("user", "whatsappNumber -_id");

    if (products.length > 0) {
      return res.status(200).json(utils.createSuccessResponse("UnTypeOfProducts", { products, limits }));
    } else return res.json(utils.createErrorResponse("We don't have products yet for this category, list one if you have"));
  }
};

module.exports.searchProducts = async (req, res) => {
  if (req.params.keywords) {
    let sanitizedKeyword = utils.sanitizeString(req.params.keywords);
    let searchResult = await mixedProductModal
      .find({
        $or: [
          { title: { $regex: sanitizedKeyword, $options: "i" } },
          { category: { $regex: sanitizedKeyword, $options: "i" } },
          { description: { $regex: sanitizedKeyword, $options: "i" } },
        ],
      })
      .select("_id title");
    return res.status(200).json(utils.createSuccessResponse("Got result", searchResult));
  } else return res.json(utils.createErrorResponse("Please provide search term"));
};

module.exports.getSingleProduct = async (req, res) => {
  let isIdValid = utils.isValidObjectId(req.params.id);
  if (isIdValid) {
    let thatSingleProduct = await mixedProductModal.findById({ _id: req.params.id }).select("-__v").populate("user", "whatsappNumber -_id");
    if (thatSingleProduct) {
      return res.status(200).json(utils.createSuccessResponse("Single product results", thatSingleProduct));
    } else return res.status(200).json(utils.createSuccessResponse("Single product results", []));
  } else return res.status(400).json(utils.createErrorResponse("Please provide valid product Id"));
};

// module.exports.intrestedInProducts = async (req, res) => {
//   let isIdValid = utils.isValidObjectId(req.params.id);
//   if (isIdValid) {
//     let thatSingleProduct = await mixedProductModal.findById({ _id: req.params.id });
//     if (thatSingleProduct) {
//       let y = thatSingleProduct["intrested"];
//       return res.json({ success: y });
//     } else return res.status(200).json(utils.createSuccessResponse("Single product results", null));
//   } else return res.status(400).json(utils.createErrorResponse("Please provide valid product Id"));
// };
