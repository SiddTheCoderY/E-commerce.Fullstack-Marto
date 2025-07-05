import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  currentProduct: null,
  loading: false,
  error: null,
  success: null,
  filteredProducts : []
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload
    },
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload
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
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload
    }
  }
})

export const { setProducts, setCurrentProduct, setLoading, setError, setSuccess, setFilteredProducts} = productSlice.actions

export default productSlice.reducer