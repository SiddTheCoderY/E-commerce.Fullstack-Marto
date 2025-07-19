import { Router } from "express";
import { authorizeRoles, verifyJWT } from "../middlewares/authorize.middleware.js";

import {
  getCartProducts,
  toggleProductToCart,
  updateCartProductCount
} from '../controllers/cart.controller.js'


const router = Router()

router.route('/get-cart-products').get(verifyJWT, getCartProducts)

router.route('/toggle-product-to-cart').post(verifyJWT,toggleProductToCart)

router.route('/update-cart-product-count').post(verifyJWT,updateCartProductCount)


export default router