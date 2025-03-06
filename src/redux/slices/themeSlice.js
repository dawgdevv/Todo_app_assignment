import { createSlice } from "@reduxjs/toolkit";

// Don't rely on localStorage during initial state creation
// This can cause hydration errors
const initialState = {
  theme: "light", // Default theme that will be overridden in App.jsx
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme(state) {
      const newTheme = state.theme === "light" ? "dark" : "light";
      state.theme = newTheme;
      // Save to localStorage
      localStorage.setItem("theme", newTheme);
      // Apply theme directly to document
      if (newTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
    setTheme(state, action) {
      state.theme = action.payload;
      localStorage.setItem("theme", action.payload);
      // Apply theme directly to document
      if (action.payload === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    },
  },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
