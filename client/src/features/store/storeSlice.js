import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stores: [],
  currentStore: null,
  loading: false,
  error: null,
  success: null,
}

const storeSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
    setStores: (state, action) => {
      state.stores = action.payload
    },
    setCurrentStore : (state, action) => {
      state.currentStore = action.payload
    },
    clearStoreState: (state) => {
      state.currentStore = null;
      state.loading = false;
      state.error = null;
      state.success = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    }
  }
})

export const { setStores, setCurrentStore, clearStoreState, setLoading, setError } = storeSlice.actions

export default storeSlice.reducer