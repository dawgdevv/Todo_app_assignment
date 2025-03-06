import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  setWeatherLoading,
  setWeatherSuccess,
  setWeatherError,
} from "./slices/taskSlice";
import { getWeatherData } from "../api/weatherapi";

// Base URL for API requests
const API_URL = ""; // Replace with your actual API URL if you have one

// Login user thunk
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      // For development/demo purposes
      if (true) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Retrieve stored users from localStorage
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        const user = storedUsers.find(
          (user) =>
            user.email === credentials.email &&
            user.password === credentials.password
        );

        if (user) {
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
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Basic validation
        if (!userData.email || !userData.password || !userData.name) {
          return rejectWithValue("All fields are required");
        }

        if (userData.password !== userData.confirmPassword) {
          return rejectWithValue("Passwords do not match");
        }

        // Retrieve stored users from localStorage
        const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
        const userExists = storedUsers.some(
          (user) => user.email === userData.email
        );

        if (userExists) {
          return rejectWithValue("User already exists");
        }

        const user = {
          id: "user-" + Date.now(),
          name: userData.name,
          email: userData.email,
          password: userData.password, // This should be hashed in a real application
        };

        // Store user data in localStorage for persistence
        storedUsers.push(user);
        localStorage.setItem("users", JSON.stringify(storedUsers));
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

// Fetch tasks thunk
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      // For development/demo purposes
      if (true) {
        // Simulate API delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Retrieve stored tasks from localStorage
        const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        return storedTasks;
      }

      // Real API call for production
      const response = await axios.get(`${API_URL}/tasks`);
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
