import { createSlice } from "@reduxjs/toolkit";
import { fetchTasks } from "../thunks";

const getTasksFromStorage = () => {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
};

const saveTasksToStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const initialState = {
  tasks: getTasksFromStorage(),
  loading: false,
  error: null,
  weatherData: null,
  weatherLoading: false,
  weatherError: null,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action) {
      state.tasks.push({
        id: Date.now().toString(),
        ...action.payload,
        completed: false,
        createdAt: new Date().toISOString(),
      });
      saveTasksToStorage(state.tasks);
    },
    removeTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      saveTasksToStorage(state.tasks);
    },
    updateTask(state, action) {
      const { id, ...updatedTask } = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task
      );
      saveTasksToStorage(state.tasks);
    },
    toggleTaskComplete(state, action) {
      state.tasks = state.tasks.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
      saveTasksToStorage(state.tasks);
    },
    setWeatherLoading(state) {
      state.weatherLoading = true;
      state.weatherError = null;
    },
    setWeatherSuccess(state, action) {
      state.weatherData = action.payload;
      state.weatherLoading = false;
    },
    setWeatherError(state, action) {
      state.weatherError = action.payload;
      state.weatherLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
        saveTasksToStorage(state.tasks);
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const {
  addTask,
  removeTask,
  updateTask,
  toggleTaskComplete,
  setWeatherLoading,
  setWeatherSuccess,
  setWeatherError,
} = taskSlice.actions;

export default taskSlice.reducer;
