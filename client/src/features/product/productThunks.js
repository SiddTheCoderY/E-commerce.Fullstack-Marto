import { createAsyncThunk } from "@reduxjs/toolkit";
import { setProducts, setCurrentProduct, setLoading, setError, setSuccess } from './productSlice'
import axiosInstance from '../../utils/axiosInstance'

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (productData, { dispatch, rejectWithValue , getState}) => {
    try {
      dispatch(setLoading(true))

      const response = await axiosInstance.post('/product/create-product', productData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      console.log("Product Created", response)
      console.log(response.data.data)

      const createdProduct = response.data.data
      const { products } = getState().product
      
       // 🔧 Create a new array instead of mutating state
       const updatedProducts = [createdProduct,...products];
       dispatch(setProducts(updatedProducts));
 
       return createdProduct;
      
    } catch (error) {
      console.log('err at geting store', error);
      dispatch(setError(error.response?.data?.message || 'Error occurred while fetching the stores'));
      return rejectWithValue(error.response?.data || error.message);
    } finally {
      dispatch(setLoading(false));
    }
  }
)

export const getAllProducts = createAsyncThunk(
  'product/getAllProducts',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading(true))

      const response = await axiosInstance.get('/product/get-all-products')

      console.log('All Products', response.data.data)
      dispatch(setProducts(response.data.data))


      return response.data.data
      
    } catch (error) {
      console.log('err at geting products', error);
      dispatch(setError(error.response?.data?.message || 'Error occurred while fetching the products'));
      return rejectWithValue(error.response?.data || error.message);
    } finally {
      dispatch(setLoading(false));
    }
  }
)