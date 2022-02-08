import { createSlice } from "@reduxjs/toolkit";
import formatTime from "../utils/formatTime";

const initialState = {
  orders: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, action) => {
      // console.log(action.payload.items);
      // console.log(action.payload.totalAmount);
      let currentOrders = state.orders;
      const date = new Date();
      const newOrder = {
        id: date.toString(),
        items: action.payload.items,
        totalAmount: action.payload.totalAmount,
        date:
          date.toDateString() +
          " " + formatTime(date) 
      };
      currentOrders.unshift(newOrder);
      state.orders = currentOrders;
      //console.log(state.orders);
    },
  },
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;
