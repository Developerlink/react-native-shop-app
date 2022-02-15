import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    status: "idle",
    token: null,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        Login: (state, action) => {

        }
    }
})

export const {Login} = authSlice.actions;
export default authSlice;