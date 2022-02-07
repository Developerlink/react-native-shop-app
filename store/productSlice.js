import { createSlice } from "@reduxjs/toolkit";
import PRODUCTS from "../data/dummyData";

const productsInJson = JSON.stringify(PRODUCTS);
const products = JSON.parse(productsInJson);

const initialState = {
  products: products,
  userProducts: products.filter((product) => product.ownerId === "u1"),
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    doSomething: (state, action) => {},
  },
});

export const { doSomething } = productSlice.actions;
export default productSlice.reducer;
