import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import agent from "../api/agent";

const initialState = {
  userEmail: "test@test.com",   
  status: "idle",
  token: null,
};

export const signupAsync = createAsyncThunk(
  "auth/signupAsync",
  async (data, thunkAPI) => {
    try {
      const response = await agent.Auth.signup(data);

      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    Login: (state, action) => {},
    setUser: (state, action) => {
        console.log("set user:")
        console.log(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signupAsync.pending, (state, action) => {
      state.status = "pendingSignup";
      console.log(state.status);
    }),
      builder.addCase(signupAsync.fulfilled, (state) => {
        state.status = "idle";
        console.log("signup succeeded");
        console.log(state.status);
      }),
      builder.addCase(signupAsync.rejected, (state) => {
        state.status = "idle";
        console.log("signup rejected");
        console.log(state.status);
      });
  },
});

export const { Login, setUser } = authSlice.actions;
export default authSlice;
