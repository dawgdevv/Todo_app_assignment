// Format date to a readable string
export const formatDate = (dateString) => {
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

// Get color based on task priority
export const getPriorityColor = (priority) => {
  switch (priority?.toLowerCase()) {
    case "high":
      return "text-red-600 bg-red-100 dark:text-red-300 dark:bg-red-900/30";
    case "medium":
      return "text-yellow-600 bg-yellow-100 dark:text-yellow-300 dark:bg-yellow-900/30";
    case "low":
      return "text-green-600 bg-green-100 dark:text-green-300 dark:bg-green-900/30";
    default:
      return "text-blue-600 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/30";
  }
};

// Filter tasks based on search term
export const filterTasks = (tasks, searchTerm) => {
  if (!searchTerm) return tasks;

  const lowerCaseSearch = searchTerm.toLowerCase();
  return tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(lowerCaseSearch) ||
      (task.description &&
        task.description.toLowerCase().includes(lowerCaseSearch))
  );
};

// Sort tasks based on various criteria
export const sortTasks = (tasks, sortBy = "date") => {
  const tasksCopy = [...tasks];

  switch (sortBy) {
    case "priority":
      const priorityOrder = { high: 1, medium: 2, low: 3, undefined: 4 };
      return tasksCopy.sort(
        (a, b) =>
          priorityOrder[a.priority?.toLowerCase()] -
          priorityOrder[b.priority?.toLowerCase()]
      );
    case "alphabetical":
      return tasksCopy.sort((a, b) => a.title.localeCompare(b.title));
    case "completed":
      return tasksCopy.sort(
        (a, b) => Number(a.completed) - Number(b.completed)
      );
    case "date":
    default:
      return tasksCopy.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
  }
};
