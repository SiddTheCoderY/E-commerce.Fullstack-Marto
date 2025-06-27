import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { setUser,setError,setLoading } from "./userSlice";

export const getCurrentUser = createAsyncThunk(
    'user/getCurrentUser',
    async(_,{dispatch,rejectWithValue}) => {
        try {
            dispatch(setLoading(true))

            const response = await axiosInstance.get('/user/get-current-user')
            console.log('current user fecthed successfully', response)
            dispatch(setUser(response.data.data.user))
            
            return response.data.data;
            
        } catch (error) {
            console.log(error.response)
            // dispatch(setError(error.response?.data?.message || 'Current User Not Found'))
            return rejectWithValue(error.response?.data || error.message)
        } finally {
            dispatch(setLoading(false))
        }
    }
)