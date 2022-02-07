import { configureStore } from "@reduxjs/toolkit";

const basketReducer = "reducer";

const store = configureStore({
    reducer: {
        basket: basketReducer        
    }
})

export default store;

