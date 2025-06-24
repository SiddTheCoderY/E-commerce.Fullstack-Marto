import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { authorizeRoles, verifyJWT } from "../middlewares/authorize.middleware.js";

import {
  createProduct,
} from '../controllers/product.controller.js'

const router = Router()


router.route('/create-product').post(
  upload.array('pictures',5),
  verifyJWT,
  authorizeRoles('seller'),
  createProduct
)

router.route('/update-product-credentials').post(
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 }
  ]),
  verifyJWT,
  authorizeRoles('seller'),
  updateStoreCredentials
)


export default router