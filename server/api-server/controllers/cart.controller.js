import { Product } from "../../shared/models/product.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Cart } from "../../shared/models/cart.model.js";
import { User } from "../../shared/models/user.model.js";



// add/remove the product to cart
export const toggleProductToCart = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  if (!productId) {
    throw new ApiError(400, 'Product ID is required');
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  let cart = await Cart.findOne({ user: req.user._id });

  if (cart) {
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId.toString()
    );

    if (itemIndex > -1) {
      // Product exists → remove from cart
      cart.items.splice(itemIndex, 1);
    } else {
      // Product not in cart → add to cart
      cart.items.push({ product: productId });
    }

    await cart.save();
  } else {
    // Create new cart
    cart = await Cart.create({
      user: req.user._id,
      items: [{ product: productId }],
    });
  }

  const remainingProductInCart = await cart.populate('items')

  res.status(200).json(
    new ApiResponse(
      200,
      {
        cartItems: remainingProductInCart,
        toggleProduct: product,
      },
      "Product Toggled to cart"
    )
  );
});

export const getCartProducts = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

  if (!cart || cart.items.length === 0) {
    return res.status(200).json(
      new ApiResponse(200, [], 'No product inside cart yet')
    );
  }

  // Sort items by product's createdAt in descending order
  const sortedItems = cart.items.sort((a, b) => {
    return new Date(b.product.createdAt) - new Date(a.product.createdAt);
  });

  return res.status(200).json(
    new ApiResponse(200, sortedItems, 'Cart products fetched successfully')
  );
});

export const updateCartProductCount = asyncHandler(async (req, res) => {
  const { productId, number } = req.body;

  if (number <= 0) {
    throw new ApiError(400, 'Product number must be greater than 0');
  }

  if (!productId) {
    throw new ApiError(400, 'Product ID is required');
  }

  const product = await Product.findById(productId);
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  const cart = await Cart.findOne({ user: req.user._id }).populate('items.product').sort({ createdAt: -1 });
  if (!cart) {
    throw new ApiError(404, 'Cart not found');
  }

  let found = false;
  
 
  cart.items = cart.items.map((item) =>{
    if (item.product._id.toString() === productId.toString()) {
      item.quantity = number;
      found = true;
    }
    return item;
  });



  if (!found) {
    throw new ApiError(404, 'Product not found in cart');
  }

  await cart.save();

  const sortedItems = cart.items.sort((a, b) => {
    return new Date(b.product.createdAt) - new Date(a.product.createdAt);
  });

  res.status(200).json(new ApiResponse(200,sortedItems,'Product quantity updated successfully'));
});
