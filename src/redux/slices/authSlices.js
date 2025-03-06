import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../thunks";

// Try to get the user from localStorage
let user = null;
try {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    user = JSON.parse(storedUser);
  }
} catch (error) {
  console.error("Error parsing stored user:", error);
}

const initialState = {
  user: user,
  loading: false,
  error: null,
  isAuthenticated: !!user,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearErrors, logout } = authSlice.actions;
export default authSlice.reducer;
