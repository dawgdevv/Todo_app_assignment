import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask } from "../../redux/slices/taskSlice";

function TaskInput() {
  const dispatch = useDispatch();
  const [task, setTask] = useState({
    title: "",
    description: "",
    priority: "medium",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.title.trim()) return;

    dispatch(addTask(task));
    setTask({
      title: "",
      description: "",
      priority: "medium",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="transition-colors duration-300">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-3 items-end">
        <div className="md:col-span-3">
          <label
            htmlFor="title"
            className="block text-sm font-medium mb-1 dark:text-gray-200"
          >
            Task Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={task.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="What needs to be done?"
            required
          />
        </div>

        <div className="md:col-span-1">
          <label
            htmlFor="priority"
            className="block text-sm font-medium mb-1 dark:text-gray-200"
          >
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={task.priority}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            Add Task
          </button>
        </div>

        <div className="md:col-span-6">
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-1 dark:text-gray-200"
          >
            Description (Optional)
          </label>
          <textarea
            id="description"
            name="description"
            value={task.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Add more details about your task"
            rows="1"
          ></textarea>
        </div>
      </div>
    </form>
  );
}

export default TaskInput;
