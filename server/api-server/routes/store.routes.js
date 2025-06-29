import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { authorizeRoles, verifyJWT } from "../middlewares/authorize.middleware.js";

import {
  createStore,
  updateStoreCredentials,
  getAllStore,
  checkStoreName
} from '../controllers/store.controller.js'


const router = Router()


router.route('/create-store').post(
  upload.fields([
    {name : 'logo', maxCount : 1},
    {name : 'banner', maxCount : 1}
  ]),
  verifyJWT,
  authorizeRoles('seller'),
  createStore
)

router.route('/update-store-credentials').post(
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 }
  ]),
  verifyJWT,
  authorizeRoles('seller'),
  updateStoreCredentials
)

router.route('/get-all-stores').get(verifyJWT, getAllStore)

router.route('/check-store-name-availablity').post(checkStoreName)


export default router