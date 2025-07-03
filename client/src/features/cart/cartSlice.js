import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartProducts: [],
  cartProductsLength: 0,
  loading: false,
  error: null,
  success: null,
  hasCartFetched: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartProducts: (state, action) => {
      state.cartProducts = action.payload;
    },
    setCartProductsLength: (state, action) => {
      state.cartProductsLength = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSuccess: (state, action) => {
      state.success = action.payload;
    },
    setHasFetched: (state, action) => {
      state.hasCartFetched = action.payload;
    },
  },
});

export const { setCartProductsLength, setCartProducts, setLoading, setError, setSuccess, setHasFetched } = cartSlice.actions

export default cartSlice.reducer