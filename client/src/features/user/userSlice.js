import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user : null,
    loading : false,
    error : null,
    isAuthenticated : false,
}

const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers : {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      setTimeout(() => {
        state.error = null
      }, 4000);
    },
    }
})

export const {setUser,setLoading,setError,clearUser} = userSlice.actions

export default userSlice.reducer