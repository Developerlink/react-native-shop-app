import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./basketReducer";

const store = configureStore({
  reducer: {
    basket: basketReducer,
  },
});

export default store;
