import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setWalletDetails } from '../slices/walletSlice';
import { axiosPost } from '../../axios';
import { SERVER } from '../../server';

export const fetchWalletDetails = createAsyncThunk(
  'wallet/fetchDetails',
  async (_, { getState, rejectWithValue, dispatch }) => {
    const accessToken = getState().auth.access;
    if (!accessToken) {
      return rejectWithValue('No access token found');
    }

    try {
      const response = await axios.get(`${SERVER}/wallet/retrieve-update/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response.data);
      dispatch(setWalletDetails(response.data))
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        return rejectWithValue('No response from server');
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const depositMoney = createAsyncThunk(
  'wallet/deposit',
  async (amount, { getState, rejectWithValue , dispatch}) => {
    const accessToken = getState().auth.access;
    const walletId = getState().wallet.id
    if (!accessToken) {
      return rejectWithValue('No access token found');
    }

    try {
      const data = {
        transaction_type : "DEPOSIT",
        amount : amount,
        wallet : walletId,
        time_slot : null
      }
      console.log("data for deposit", data);
      
      const response = await axiosPost('wallet/transactions/', data, accessToken)
      console.log("Deposit Response", response );
      dispatch(setWalletDetails(response.data.wallet))
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        return rejectWithValue('No response from server');
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const withdrawMoney = createAsyncThunk(
  'wallet/withdraw',
  async ({amount, time_slot}, { getState, rejectWithValue, dispatch }) => {
    const accessToken = getState().auth.access;
    const walletId = getState().wallet.id
    if (!accessToken) {
      return rejectWithValue('No access token found');
    }

    try {
      const data = {
        transaction_type : "WITHDRAW",
        amount : amount,
        wallet : walletId,
        time_slot : time_slot
      }
      const response = await axiosPost('wallet/transactions/', data, accessToken)
      console.log("Withdraw response", response);
      
      dispatch(setWalletDetails(response.data.wallet))
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else if (error.request) {
        return rejectWithValue('No response from server');
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
