import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import localStateReducer from '../features/localState/localStateSlice';
import storeReducer from '../features/store/storeSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    localState: localStateReducer,
    store : storeReducer
  },
})
