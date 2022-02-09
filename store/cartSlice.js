import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const addedProduct = action.payload;
      let currentCartItems = state.items;
      let cartItemFound = currentCartItems.find(
        (item) => item.id === addedProduct.id
      );

      if (cartItemFound) {
        cartItemFound.quantity += 1;
        cartItemFound.sum += cartItemFound.price;
      } else {
        const newCartItem = {
          id: addedProduct.id,
          title: addedProduct.title,
          price: addedProduct.price,
          quantity: 1,
          sum: addedProduct.price,
        };
        currentCartItems.push(newCartItem);
      }
      state.items = currentCartItems;
      state.totalAmount = state.totalAmount + addedProduct.price;
      // console.log(state.items);
      // console.log("total: " + state.totalAmount);
    },
    removeFromCart: (state, action) => {
      const removedItem = action.payload;
      let currentCartItems = state.items;
      let foundIndex = currentCartItems.findIndex(
        (item) => item.id === removedItem.id
      );

      if (foundIndex >= 0) {
        currentCartItems[foundIndex].quantity -= 1;
        currentCartItems[foundIndex].sum -= removedItem.price;

        if (currentCartItems[foundIndex].quantity < 1) {
          currentCartItems.splice(foundIndex, 1);
        }

        state.items = currentCartItems;
        state.totalAmount = state.totalAmount - removedItem.price;
        if (state.totalAmount < 0) {
          state.totalAmount = 0;
        }
        // console.log(state.items);
        // console.log("total: " + state.totalAmount);
      }
    },
    resetCart: (state, action) => {
      state.items = [],
      state.totalAmount = 0;
      // state = initialState; // This does not re-render GUI for some reason!
      //console.log(state);
    },
    deleteProductFromCart: (state,action) => {
      const id = action.payload.id;
      const itemToBeRemoved = state.items.find(item => item.id === id);
      //console.log("Item to be removed: " + itemToBeRemoved);
      if (itemToBeRemoved){
        state.totalAmount = state.totalAmount - itemToBeRemoved.sum;
        state.items = state.items.filter(item => item.id !== id);
      }

    }
  },
});

export const { addToCart, removeFromCart, resetCart, deleteProductFromCart } = cartSlice.actions;
export default cartSlice.reducer;
