import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PRODUCTS from "../data/dummyData";
import agent from "../api/agent";

const productsInJson = JSON.stringify(PRODUCTS);
const products = JSON.parse(productsInJson);

const initialState = {
  products: products,
  userProducts: products.filter((product) => product.ownerId === "u1"),
  status: "idle"
};

export const getProductsAsync = createAsyncThunk(
  "products/getProductsAsync",
  async (_, thunkAPI) => {
    try {
      const result = await agent.Products.getProducts();
      console.log(result);
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue({error: error.data});
    }
  }
)

export const createProductAsync = createAsyncThunk(
  "products/createProductAsync",
  async (data, thunkAPI) => {
    //console.log("thunk reached");
    try {
      const result = await agent.Products.postProduct(data);
      return result;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(createProductAsync.pending, (state) => {
      state.status = "pendingCreateProduct";
      console.log(state.status);
    }),
    builder.addCase(createProductAsync.fulfilled, (state) => {
      state.status = "idle";
      console.log(state.status);
    }),
    builder.addCase(createProductAsync.rejected, (state) => {
      state.status = "idle";
    }),
    builder.addCase(getProductsAsync.pending, (state) => {
      state.status = "pendingGetProducts";
      console.log(state.status);
    }),
    builder.addCase(getProductsAsync.fulfilled, (state) => {
      state.status = "idle";
      console.log(state.status);
    }),
    builder.addCase(getProductsAsync.rejected, (state) => {
      state.status = "idle";
    }) 
  }
});

export const { deleteProduct, createProduct, updateProduct } =
  productSlice.actions;
export default productSlice.reducer;
