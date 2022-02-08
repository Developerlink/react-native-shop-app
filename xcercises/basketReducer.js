import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  state: false,
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    reducer1: (state, action) => {},
    reducer2: (state, action) => {},
  },
});

export const { reducer1, reducer2 } = basketSlice.actions;
export default basketSlice.reducer;
