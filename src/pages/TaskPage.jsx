import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import TaskInput from "../components/Task/TaskInput";
import TaskList from "../components/Task/TaskList";
import { filterTasks, sortTasks } from "../utils/helper";
import { fetchWeather } from "../redux/thunks";

function TaskPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { tasks } = useSelector((state) => state.tasks);
  const { weatherData, weatherLoading } = useSelector((state) => state.tasks);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("date");
  const [location, setLocation] = useState("Jaipur"); // Default location for weather

  // Filter and sort tasks
  const filteredTasks = sortTasks(filterTasks(tasks, searchTerm), sortOption);

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate("/login");
    }

    // Fetch weather data
    const fetchUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            const location = `${latitude},${longitude}`;
            setLocation(location);
            dispatch(fetchWeather(location));
          },
          (error) => {
            console.error("Error fetching location:", error);
            // Fallback to default location
            dispatch(fetchWeather(location));
          }
        );
      } else {
        // Fallback to default location
        dispatch(fetchWeather(location));
      }
    };

    fetchUserLocation();
  }, [user, navigate, dispatch, location]);

  return (
    <div className="max-w-4xl mx-auto flex flex-col h-[85vh]">
      {/* Header with weather */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 mb-3">
        <div>
          <h1 className="text-2xl font-bold dark:text-white">Your Tasks</h1>
          {user && (
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">
              Hi {user.name}, here are your tasks for today
            </p>
          )}
        </div>

        {weatherData && !weatherLoading && (
          <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg text-sm flex items-center transition-colors duration-300 self-stretch md:self-auto shrink-0">
            <span className="mr-2 dark:text-gray-300 text-xs">
              {weatherData.name}:
            </span>
            <span className="font-medium dark:text-white text-xs">
              {Math.round(weatherData.main.temp)}°C
            </span>
            <span className="ml-2 capitalize dark:text-gray-300 hidden sm:inline text-xs">
              {weatherData.weather[0].description}
            </span>
          </div>
        )}
      </div>

      {/* Search and Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-2 justify-between mb-3">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-3 py-1.5 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="date">Sort by Date</option>
          <option value="priority">Sort by Priority</option>
          <option value="alphabetical">Sort by Name</option>
          <option value="completed">Sort by Completion</option>
        </select>
      </div>

      {/* Task List Container */}
      <div className="flex-grow overflow-y-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 mb-3 transition-colors duration-300 border border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-medium dark:text-white mb-1">
          Task List{" "}
          {tasks.length > 0 && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              ({tasks.length})
            </span>
          )}
        </h2>

        <TaskList tasks={filteredTasks} />

        {filteredTasks.length === 0 && (
          <div className="text-center py-6 text-gray-500 dark:text-gray-400 text-sm">
            {tasks.length === 0
              ? "No tasks yet. Add your first task below!"
              : "No matching tasks found."}
          </div>
        )}
      </div>

      {/* Task Input - Compact */}
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-md transition-colors duration-300 border border-gray-100 dark:border-gray-700">
        <h2 className="text-lg font-medium mb-2 dark:text-white">
          Add New Task
        </h2>
        <TaskInput />
      </div>
    </div>
  );
}

export default TaskPage;
