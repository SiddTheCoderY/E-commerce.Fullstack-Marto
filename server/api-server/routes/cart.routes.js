import { Router } from "express";
import { authorizeRoles, verifyJWT } from "../middlewares/authorize.middleware.js";

import {
  getCartProducts,
  toggleProductToCart
} from '../controllers/cart.controller.js'


const router = Router()

router.route('/get-cart-products').get(verifyJWT, getCartProducts)

router.route('/toggle-product-to-cart').post(verifyJWT,toggleProductToCart)


export default router