import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  setWeatherLoading,
  setWeatherSuccess,
  setWeatherError,
} from "./slices/taskSlice";
import { getWeatherData } from "../api/weatherapi";

// Base URL for API requests
const API_URL = "your-api-url";

// Login user thunk
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      // For development/demo purposes
      if (true) {
        // Changed from process.env.NODE_ENV check to always use mock in demo
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Mock login - replace with actual API call in production
        if (
          credentials.email === "test@example.com" &&
          credentials.password === "password"
        ) {
          const user = {
            id: "user-1",
            name: "Test User",
            email: credentials.email,
          };

          // Store user data in localStorage for persistence
          localStorage.setItem("user", JSON.stringify(user));
          return user;
        } else {
          return rejectWithValue("Invalid email or password");
        }
      }

      // Real API call for production
      const response = await axios.post(`${API_URL}/auth/login`, credentials);

      // Save the user data and token to localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);

      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  }
);

// Register user thunk
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      // For development/demo purposes
      if (true) {
        // Changed from process.env.NODE_ENV check to always use mock in demo
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Basic validation
        if (!userData.email || !userData.password || !userData.name) {
          return rejectWithValue("All fields are required");
        }

        if (userData.password !== userData.confirmPassword) {
          return rejectWithValue("Passwords do not match");
        }

        // Mock registration - replace with actual API call in production
        const user = {
          id: "user-" + Date.now(),
          name: userData.name,
          email: userData.email,
        };

        // Store user data in localStorage for persistence
        localStorage.setItem("user", JSON.stringify(user));
        return user;
      }

      // Real API call for production
      const response = await axios.post(`${API_URL}/auth/register`, userData);

      // Save the user data and token to localStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("token", response.data.token);

      return response.data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  }
);

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue, getState }) => {
    try {
      // Get the user from the state
      const { auth } = getState();

      // If not authenticated, reject
      if (!auth.user) {
        return rejectWithValue("Not authenticated");
      }

      // For development/demo purposes
      if (true) {
        // Changed from process.env.NODE_ENV check to always use mock in demo
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Return mock tasks
        return [
          {
            id: "1",
            title: "Complete project",
            description: "Finish the Todo app project",
            completed: false,
            priority: "high",
            createdAt: new Date().toISOString(),
          },
          {
            id: "2",
            title: "Learn Redux",
            description: "Study Redux and Redux Toolkit",
            completed: true,
            priority: "medium",
            createdAt: new Date().toISOString(),
          },
        ];
      }

      // Get the token from localStorage
      const token = localStorage.getItem("token");

      // Real API call for production
      const response = await axios.get(`${API_URL}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch tasks. Please try again."
      );
    }
  }
);

// Weather thunk
export const fetchWeather = createAsyncThunk(
  "tasks/fetchWeather",
  async (location, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setWeatherLoading());
      const weatherData = await getWeatherData(location);
      dispatch(setWeatherSuccess(weatherData));
      return weatherData;
    } catch (error) {
      dispatch(
        setWeatherError(error.message || "Failed to fetch weather data")
      );
      return rejectWithValue(error.message || "Failed to fetch weather data");
    }
  }
);
