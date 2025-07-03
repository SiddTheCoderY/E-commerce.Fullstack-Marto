import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishListProducts: [],
  wishListCurrentProduct: null,
  loading: false,
  error: null,
  success: null
}

const wishListProductSlice = createSlice({
  name: 'wishListProduct',
  initialState,
  reducers: {
    setWishListProducts: (state, action) => {
      state.wishListProducts = action.payload
    },
    setWishListCurrentProduct: (state, action) => {
      state.wishListCurrentProduct = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    setSuccess: (state, action) => {
      state.success = action.payload
    },
  }
})

export const {setWishListCurrentProduct , setWishListProducts, setLoading, setError, setSuccess} = wishListProductSlice.actions

export default wishListProductSlice.reducer