import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
  success: null
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts : (stateaction)
  }
})

export const { } = productSlice.actions

export default productSlice.reducer