import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import PRODUCTS from "../data/dummyData";
import agent from "../api/agent";

const productsInJson = JSON.stringify(PRODUCTS);
const products = JSON.parse(productsInJson);

const initialState = {
  products: [],
  userProducts: [],
  status: "idle",
  errorStatus: "",
};

export const getProductsAsync = createAsyncThunk(
  "products/getProductsAsync",
  async (_, thunkAPI) => {
    try {
      let loadedProducts = [];
      const result = await agent.Products.getProducts();
      //console.log(result);
      for (const key in result) {
        loadedProducts.push({
          id: key,
          ...result[key],
        });
      }
      return loadedProducts;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const postProductAsync = createAsyncThunk(
  "products/postProductAsync",
  async (data, thunkAPI) => {
    //console.log("thunk reached");
    try {
      const result = await agent.Products.postProduct(data);
      return {
        id: result.name,
        ...data,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const putProductAsync = createAsyncThunk(
  "products/putProductAsync",
  async (data, thunkAPI) => {
    try {
      await agent.Products.putProduct(data);

      return { id: data.key, ...data.product };
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.data });
    }
  }
);

export const deleteProductAsync = createAsyncThunk(
  "products/deleteProductAsync",
  async (id, thunkAPI) => {
    try {
      await agent.Products.deleteProduct(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue({
        error: error.data,
      });
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
      console.log(action.payload);
      let newProduct = action.payload;
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
    resetErrorStatus: (state) => {
      errorStatus = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(postProductAsync.pending, (state) => {
      state.status = "pendingPostProduct";
      console.log(state.status);
    }),
      builder.addCase(postProductAsync.fulfilled, (state, action) => {
        let newProduct = action.payload;
        // Updating all products.
        let currentProducts = state.products;
        currentProducts.push(newProduct);
        state.products = currentProducts;
        // Updating user related products.
        state.userProducts = state.products.filter(
          (product) => product.ownerId === "u1"
        );
        state.status = "idle";
        console.log(state.status);
      }),
      builder.addCase(postProductAsync.rejected, (state) => {
        state.status = "idle";
      }),
      builder.addCase(getProductsAsync.pending, (state) => {
        state.status = "pendingGetProducts";
        console.log(state.status);
      }),
      builder.addCase(getProductsAsync.fulfilled, (state, action) => {
        state.products = action.payload;
        state.userProducts = action.payload.filter(
          (product) => product.ownerId === "u1"
        );
        state.status = "idle";
        console.log(state.status);
      }),
      builder.addCase(getProductsAsync.rejected, (state) => {
        state.status = "idle";
      }),
      builder.addCase(putProductAsync.pending, (state) => {
        state.status = "pendingPutProduct";
        console.log(state.status);
      }),
      builder.addCase(putProductAsync.fulfilled, (state, action) => {
        //console.log(action.payload);
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
        state.status = "idle";
        console.log(state.status);
      }),
      builder.addCase(putProductAsync.rejected, (state) => {
        state.status = "idle";
      }),
      builder.addCase(deleteProductAsync.pending, (state) => {
        state.status = "pendingDeleteProduct";
        console.log(state.status);
      }),
      builder.addCase(deleteProductAsync.fulfilled, (state, action) => {
        console.log(action.payload);
        state.userProducts = state.userProducts.filter(
          (product) => product.id !== action.payload
        );
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
        state.status = "idle";
        console.log(state.status);
      }),
      builder.addCase(deleteProductAsync.rejected, (state) => {
        state.status = "idle";
        state.errorStatus = "Something went wrong deleting the product.";
      });
  },
});

export const { deleteProduct, createProduct, updateProduct, resetErrorStatus } =
  productSlice.actions;
export default productSlice;
