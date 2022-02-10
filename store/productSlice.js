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
    deleteProduct: (state, action) => {
      // console.log("deleting product");
      // console.log(action.payload.id);
      state.userProducts = state.userProducts.filter(
        (product) => product.id !== action.payload.id
      );
      state.products = state.products.filter(
        (product) => product.id !== action.payload.id
      );
      // console.log(updatedUserProducts);
    },
    createProduct: (state, action) => {
      // console.log("creating product");
      // console.log(action.payload);
      let newProduct = action.payload;
      newProduct.id = Date();
      let currentProducts = state.products;
      currentProducts.push(newProduct);
      state.products = currentProducts;
      state.userProducts = state.products.filter(
        (product) => product.ownerId === "u1"
      );
    },
    updateProduct: (state, action) => {
      // console.log("updating product");
      // console.log(action.payload);
      let currentProducts = state.products;
      const index = currentProducts.findIndex(
        (product) => product.id === action.payload.id
      );
      // console.log(updatedProduct);
      currentProducts[index] = action.payload; 
      //console.log(currentProducts[index]);
      state.products = currentProducts;
      //console.log(state.products);
      // Remember that ownerId has already been set when loading the product!
      state.userProducts = state.products.filter(
        (product) => product.ownerId === "u1"
      );
    },
  },
});

export const { deleteProduct, createProduct, updateProduct } =
  productSlice.actions;
export default productSlice.reducer;
