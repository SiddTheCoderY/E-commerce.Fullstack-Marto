import { createAsyncThunk } from "@reduxjs/toolkit";
import { setWishListCurrentProduct, setWishListProducts, setLoading, setError, setSuccess } from './wishListSlice'
import {updateUserWishList} from '../user/userSlice'
import axiosInstance from "../../utils/axiosInstance";

export const getWishListProducts = createAsyncThunk(
  'wishListProduct/getWishListProducts',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true))
      const response = await axiosInstance.get('/product/get-wish-list-products')
      const products = response.data.data
      dispatch(setWishListProducts(products))
      
    } catch (error) {
      console.log('err at geting wishlist product', error);
      dispatch(setError(error.response?.data?.message || 'Error occurred while fetching the wishList Products'));
      return rejectWithValue(error.response?.data || error.message);
    } finally {
      dispatch(setLoading(false));
    }
  }
)

// toggle -> add/remove
export const toggleProductToWishList = createAsyncThunk(
  'wishListProduct/toggleProductToWishList',
  async ({ productId }, { dispatch, rejectWithValue, getState }) => {
    try {
      dispatch(setLoading(true));

      const response = await axiosInstance.post(
        `/product/toggle-product-to-wish-list`,
        { productId }
      );

      const updatedUserWishlist = response.data.userWishListIds; // only IDs
      const toggledProduct = response.data.toggledProduct; // full product object

      // ✅ Update user's wishlist in userSlice
      dispatch(updateUserWishList(updatedUserWishlist));

      const { wishListProducts } = getState().wishListProduct;
      const exists = wishListProducts.some(
        (product) => product._id === toggledProduct._id
      );

      let updatedList;

      if (exists) {
        // ✅ Remove product from wishlist state
        updatedList = wishListProducts.filter(
          (product) => product._id !== toggledProduct._id
        );
      } else {
        // ✅ Add product to wishlist state
        updatedList = [toggledProduct, ...wishListProducts];
      }

      dispatch(setWishListProducts(updatedList));
      return updatedList;
    } catch (error) {
      console.log('err at toggling product to wishlist', error);
      dispatch(
        setError(
          error.response?.data?.message ||
            'Error occurred while toggling the product to wishlist'
        )
      );
      return rejectWithValue(error.response?.data || error.message);
    } finally {
      dispatch(setLoading(false));
    }
  }
);
