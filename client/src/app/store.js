import { configureStore } from '@reduxjs/toolkit'
import userReducer from '../features/user/userSlice'
import localStateReducer from '../features/localState/localStateSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    localState : localStateReducer,
  },
})
