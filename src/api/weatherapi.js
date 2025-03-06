import axios from "axios";

// You'll need to get your own API key from OpenWeatherMap or a similar service
const API_KEY = "596cd1c4fc2c1ceb28ebb64a70addebb"; // Replace with your actual API key
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getWeatherData = async (location = "London") => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: location,
        units: "metric",
        appid: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch weather data"
    );
  }
};
