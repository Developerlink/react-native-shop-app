import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import formatTime from "../utils/formatTime";
import agent from "../api/agent";

const initialState = {
  orders: [],
  status: "idle",
};

export const getOrdersAsync = createAsyncThunk(
  "orders/getOrdersAsync",
  async (ownerId, thunkAPI) => {
    try {
      let loadedOrders = [];
      const result = await agent.Orders.getOrders(ownerId);
      for (const key in result) {
        loadedOrders.push({
          id: key,
          ...result[key],
        });
      }
      // console.log(loadedOrders);
      return loadedOrders.reverse();
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const postOrderAsync = createAsyncThunk(
  "orders/postOrderAsync",
  async (data, thunkAPI) => {
    const date = new Date();
    try {
      const result = await agent.Orders.postOrder({
        ownerId: data.ownerId,
        order: {
          items: data.order.items,
          totalAmount: data.order.totalAmount,
          date: date.toDateString() + " " + formatTime(date),
        },
      });
      return {
        id: result.name,
        items: data.order.items,
        totalAmount: data.order.totalAmount,
        date: date.toDateString() + " " + formatTime(date),
      };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

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
        date: date.toDateString() + " " + formatTime(date),
      };
      currentOrders.unshift(newOrder);
      state.orders = currentOrders;
      //console.log(state.orders);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getOrdersAsync.pending, (state) => {
      state.status = "pendingGetOrders";
      console.log(state.status);
    }),
      builder.addCase(getOrdersAsync.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.status = "idle";
        console.log(state.status);
      }),
      builder.addCase(getOrdersAsync.rejected, (state) => {
        state.status = "idle";
        console.log(state.status);
      }),
      builder.addCase(postOrderAsync.pending, (state) => {
        state.status = "pendingPostOrder";
        console.log(state.status);
      }),
      builder.addCase(postOrderAsync.fulfilled, (state, action) => {
        let currentOrders = state.orders;
        currentOrders.unshift(action.payload);
        state.orders = currentOrders;
        state.status = "idle";
        console.log(state.status);
      }),
      builder.addCase(postOrderAsync.rejected, (state) => {
        state.status = "idle";
        console.log(state.status);
      })
  },
});

export const { addOrder } = orderSlice.actions;
export default orderSlice;
