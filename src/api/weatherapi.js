import axios from "axios";

// You'll need to get your own API key from OpenWeatherMap or a similar service
const API_KEY =
  import.meta.env.VITE_OPEN_WEATHER_API || "596cd1c4fc2c1ceb28ebb64a70addebb"; // Replace with your actual API key
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export const getWeatherData = async (location = "London") => {
  try {
    const params = {
      units: "metric",
      appid: API_KEY,
    };

    // Check if location is coordinates or city name
    if (location.includes(",")) {
      const [lat, lon] = location.split(",");
      params.lat = lat;
      params.lon = lon;
    } else {
      params.q = location;
    }

    const response = await axios.get(`${BASE_URL}/weather`, { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw new Error(
      error.response?.data?.message || "Failed to fetch weather data"
    );
  }
};
