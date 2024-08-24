import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
// Redesign required
export const fetchWalletDetails = createAsyncThunk(
  'wallet/fetchDetails',
  async (_, { getState, rejectWithValue }) => {
    const accessToken = getState().auth.access;
    if (!accessToken) {
      return rejectWithValue('No access token found');
    }

    try {
      const response = await axios.get('http://127.0.0.1:8000/wallet/retrieve-update/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
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
  async (amount, { getState, rejectWithValue }) => {
    const accessToken = getState().auth.access;
    if (!accessToken) {
      return rejectWithValue('No access token found');
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/wallet/retrieve-update/', { amount}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
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
  async (amount, { getState, rejectWithValue }) => {
    const accessToken = getState().auth.access;
    if (!accessToken) {
      return rejectWithValue('No access token found');
    }

    try {
      const response = await axios.patch('http://127.0.0.1:8000/wallet/retrieve-update/', { amount}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
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

const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    id: '',
    balance: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWalletDetails.fulfilled, (state, action) => {
      console.log('Fetch Wallet Details Fulfilled:', action.payload); 
      state.id = action.payload.id
      state.balance = action.payload.balance;
    });
    builder.addCase(depositMoney.fulfilled, (state, action) => {
      console.log('Deposit Money Fulfilled:', action.payload); 
      state.balance += action.payload.amount;
    });
    builder.addCase(withdrawMoney.fulfilled, (state, action) => {
      console.log('Withdraw Money Fulfilled:', action.payload); 
      state.balance -= action.payload.amount;
    });
    builder.addCase(fetchWalletDetails.rejected, (state, action) => {
      console.error('Fetch Wallet Details Failed:', action.payload);
    });
    builder.addCase(depositMoney.rejected, (state, action) => {
      console.error('Deposit Money Failed:', action.payload);
    });
    builder.addCase(withdrawMoney.rejected, (state, action) => {
      console.error('Withdraw Money Failed:', action.payload);
    });
  },
});

export default walletSlice.reducer;
