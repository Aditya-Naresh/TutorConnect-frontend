import { createSlice } from '@reduxjs/toolkit';

const walletSlice = createSlice({
  name: 'wallet',
  initialState: {
    id: '',
    balance: 0,
  },
  reducers: {
    setWalletDetails: (state, action) => {
      state.id = action.payload.id;
      state.balance = action.payload.balance;
    },
    deposit: (state, action) => {
      state.balance += action.payload.amount;
    },
    withdraw: (state, action) => {
      state.balance -= action.payload.amount;
    },
  },
});

export const { setWalletDetails, deposit, withdraw } = walletSlice.actions;
export default walletSlice.reducer;
