import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import {
  setCartProductsLength,
  setCartProducts,
  setLoading,
  setError,
  setSuccess,
  setHasFetched
} from "./cartSlice";

export const toggleProductToCart = createAsyncThunk(
  "cart/toggleProductToCart",
  async ({ productId }, { dispatch, rejectWithValue, getState }) => {
    try {
      dispatch(setLoading(true));

      const response = await axiosInstance.post(
        "/cart/toggle-product-to-cart",
        { productId }
      );

      const newProducts = response.data.data.cartItems.items;
      const toggledProduct = response.data.data.toggleProduct;
      
      dispatch(setCartProductsLength(newProducts.length));
      dispatch(setHasFetched(true))

      return newProducts;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response.message);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const getCartProducts = createAsyncThunk(
  "cart/getCartProducts",
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      dispatch(setLoading(true));

      const response = await axiosInstance.get("/cart/get-cart-products");
      const cartProducts = response.data.data;
      dispatch(setCartProductsLength(cartProducts.length));
      dispatch(setCartProducts(cartProducts));
      console.log("Cart Prdoct fetched", cartProducts);

      return cartProducts;
    } catch (error) {
      console.log("err at getting cart prodocts", error);
    } finally {
      dispatch(setLoading(false));
    }
  }
);
