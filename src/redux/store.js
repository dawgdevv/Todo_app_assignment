import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlices";
import taskReducer from "./slices/taskSlice";
import themeReducer from "./slices/themeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    theme: themeReducer,
  },
});
