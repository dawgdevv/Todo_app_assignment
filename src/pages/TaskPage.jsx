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
  const [location] = useState("Jaipur"); // Default location for weather

  // Filter and sort tasks
  const filteredTasks = sortTasks(filterTasks(tasks, searchTerm), sortOption);

  useEffect(() => {
    // Redirect if not logged in
    if (!user) {
      navigate("/login");
    }

    // Fetch weather data
    dispatch(fetchWeather(location));
  }, [user, navigate, dispatch, location]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-3xl font-bold">Your Tasks</h1>

        {weatherData && !weatherLoading && (
          <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg text-sm flex items-center transition-colors duration-300">
            <span className="mr-2 dark:text-gray-300">
              Weather in {weatherData.name}:
            </span>
            <span className="font-medium dark:text-white">
              {weatherData.main.temp}°C
            </span>
            <span className="ml-2 capitalize dark:text-gray-300">
              {weatherData.weather[0].description}
            </span>
          </div>
        )}
      </div>

      <TaskInput />

      <div className="my-6 flex flex-col sm:flex-row gap-4 justify-between">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="date">Sort by Date</option>
          <option value="priority">Sort by Priority</option>
          <option value="alphabetical">Sort by Name</option>
          <option value="completed">Sort by Completion</option>
        </select>
      </div>

      <TaskList tasks={filteredTasks} />

      {filteredTasks.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          {tasks.length === 0
            ? "No tasks yet. Add your first task!"
            : "No matching tasks found."}
        </div>
      )}
    </div>
  );
}

export default TaskPage;
