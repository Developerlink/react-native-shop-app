import { createSlice } from "@reduxjs/toolkit";
import CartItem from "../models/cartItem";

const initialState = {
  items: {},
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const addedProduct = action.payload;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;
      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        updatedOrNewCartItem = {
          quantity: state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          sum: state.items[addedProduct.id].sum + productPrice,
        };
      } else {
        updatedOrNewCartItem = {
          quantity: 1,
          productPrice,
          productTitle,
          sum: productPrice,
        };
      }
      state.items = { ...state.items, [addedProduct.id]: updatedOrNewCartItem };
      state.totalAmount = state.totalAmount + productPrice;
      console.log(state.items);
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
