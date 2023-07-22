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

/*
 * @adding_products
 */
routes.post("/add/:id", verfifyMiddleware, uploads.array("productImages"), goThroughTryCatchMiddleware(productController.addProduct));

/*
 * @get_Listed_products
 * ! Note--> Route name hast to be changed
 */
routes.get("/myproducts/:id", verfifyMiddleware, goThroughTryCatchMiddleware(productController.getAllProducts));

/*
 * @removing_products
 */
routes.patch("/delist/:id", verfifyMiddleware, goThroughTryCatchMiddleware(productController.delistProduct));

/*
 * @Get_All_Category_Wise_Products
 */
routes.get("/view/:category", goThroughTryCatchMiddleware(productController.getCategoryWiseProduct));

/*
 * @Get_All_Category_Wise_Products
 */
routes.get("/search/:keywords", goThroughTryCatchMiddleware(productController.searchProducts));

/*
 * @Get_Product_By_Id_Without_Athorization
 */
routes.get("/singleDetails/:id", goThroughTryCatchMiddleware(productController.getSingleProduct));

/*
 * @intrested_products
 */
// routes.patch("/intrested/:id", goThroughTryCatchMiddleware(productController.intrestedInProducts));

module.exports = routes;
