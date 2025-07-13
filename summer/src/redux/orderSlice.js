import { createSlice } from '@reduxjs/toolkit';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    lastOrder: null,       // stores the most recent order
    orderHistory: [],      // optional: store all orders (for tracking later)
  },
  reducers: {
    saveOrder: (state, action) => {
      state.lastOrder = action.payload;
      state.orderHistory.push(action.payload); // optional: keep order history
    },
    clearLastOrder: (state) => {
      state.lastOrder = null;
    },
    clearOrderHistory: (state) => {
      state.orderHistory = [];
    }
  },
});

export const { saveOrder, clearLastOrder, clearOrderHistory } = orderSlice.actions;
export default orderSlice.reducer;
