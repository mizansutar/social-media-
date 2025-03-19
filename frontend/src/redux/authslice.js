import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, // Authentication state
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set authenticated user
    setAuthUser: (state, action) => {
      state.user = action.payload;
    },
    // Action to clear authenticated user (logout)
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { setAuthUser, logoutUser } = authSlice.actions;
export default authSlice.reducer;
