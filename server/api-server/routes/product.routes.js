import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { authorizeRoles, verifyJWT } from "../middlewares/authorize.middleware.js";

import {
  createProduct,
  updateProductCredentials,
  rateTheProduct,
  getWishListedProducts,
  toggleProductToWishList,
  getAllProducts,
} from '../controllers/product.controller.js'

const router = Router()


router.route('/create-product').post(
  upload.array('images',5),
  verifyJWT,
  authorizeRoles('seller'),
  createProduct
)

router.route('/update-product-credentials').post(
  upload.array('images',5),
  verifyJWT,
  authorizeRoles('seller'),
  updateProductCredentials
)

router.route('/rate-the-product').post(verifyJWT,authorizeRoles('consumer'),rateTheProduct)

router.route("/get-wish-list-products").get(verifyJWT,getWishListedProducts)
router.route("/toggle-product-to-wish-list").post(verifyJWT,toggleProductToWishList)

router.route("/get-all-products").get(getAllProducts)

export default router