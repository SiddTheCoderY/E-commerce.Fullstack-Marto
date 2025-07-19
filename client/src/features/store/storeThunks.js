import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from '../../utils/axiosInstance';
import { setStores, setCurrentStore, clearStoreState, setLoading, setError, setHasFetched } from "./storeSlice";
import { useSelector } from "react-redux";
import { setProducts } from "../product/productSlice";

export const getAllStores = createAsyncThunk(
  'store/getAllStores',
  async (_, { dispatch, rejectWithValue, getState }) => {
    try {
      dispatch(setLoading(true));

      const response = await axiosInstance.get('/store/get-all-stores');
      const stores = response.data.data;
      console.log("Stores", stores);
  
      dispatch(setStores(stores));
      dispatch(setHasFetched(true))


      // Try to restore previously selected store from localStorage
      const storedId = localStorage.getItem('selectedStoreId');
      const matchedStore = stores.find(store => store._id === storedId);

      if (matchedStore) {
        dispatch(setCurrentStore(matchedStore));
      } else {
        dispatch(setCurrentStore(stores[0])); // fallback to first store
        localStorage.setItem('selectedStoreId', stores[0]?._id);
      }

      dispatch(setProducts(matchedStore?.products || []))
      return stores;

    } catch (error) {
      console.log('err at geting store', error);
      dispatch(setError(error.response?.data?.message || 'Error occurred while fetching the stores'));
      return rejectWithValue(error.response?.data || error.message);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

export const createStore = createAsyncThunk(
  'store/createStore',
  async (storeData, { dispatch, rejectWithValue, getState }) => {
    try {
      dispatch(setLoading(true));

      const response = await axiosInstance.post('/store/create-store', storeData);
      const createdStore = response.data.data;
      const { stores = [] } = getState().store; // ✅ Correct way to access current store state
      
      const newStores = [...stores, createdStore];
      dispatch(setStores(newStores));
      dispatch(setHasFetched(true))
      dispatch(setCurrentStore(createdStore));
      localStorage.setItem('selectedStoreId', createdStore._id); 
      dispatch(setProducts(createdStore?.products || []))

      return createdStore;
    } catch (error) {
      console.log('err at creating store', error);
      dispatch(setError(error.response?.data?.message || 'Error occurred while creating the store'));
      return rejectWithValue(error.response?.data || error.message);
    } finally {
      dispatch(setLoading(false));
    }
  }
);

