import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { authorizeRoles, verifyJWT } from "../middlewares/authorize.middleware.js";

import {
  createProduct,
  updateProductCredentials
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
  updateStoreCredentials
)


export default router