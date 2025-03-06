import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  removeTask,
  updateTask,
  toggleTaskComplete,
} from "../../redux/slices/taskSlice";
import { formatDate, getPriorityColor } from "../../utils/helper";
import Modal from "../UI/Modal";
import Button from "../UI/Button";

function TaskItem({ task }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority,
  });

  const handleToggleComplete = () => {
    dispatch(toggleTaskComplete(task.id));
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this task?")) {
      dispatch(removeTask(task.id));
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateTask({ id: task.id, ...editedTask }));
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedTask({
      title: task.title,
      description: task.description,
      priority: task.priority,
    });
    setIsEditing(false);
  };

  const priorityClass = getPriorityColor(task.priority);

  if (isEditing) {
    return (
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300">
        <form onSubmit={handleUpdate}>
          <div className="mb-2">
            <label className="block text-sm font-medium mb-1 dark:text-gray-200">
              Task Title
            </label>
            <input
              type="text"
              name="title"
              value={editedTask.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
              required
            />
          </div>

          <div className="mb-2">
            <label className="block text-sm font-medium mb-1 dark:text-gray-200">
              Description
            </label>
            <textarea
              name="description"
              value={editedTask.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
              rows="2"
            ></textarea>
          </div>

          <div className="mb-3">
            <label className="block text-sm font-medium mb-1 dark:text-gray-200">
              Priority
            </label>
            <select
              name="priority"
              value={editedTask.priority}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white text-sm"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex gap-2">
            <Button type="submit" variant="primary" size="sm">
              Save
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <>
      <div
        className={`bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-colors duration-300 hover:shadow-md ${
          task.completed ? "opacity-70" : ""
        }`}
      >
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center flex-grow overflow-hidden">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleToggleComplete}
              className="mr-2 h-4 w-4 text-blue-600 dark:border-gray-600 rounded"
            />
            <h3
              onClick={() => setIsDetailModalOpen(true)}
              className={`font-medium cursor-pointer hover:text-blue-600 dark:hover:text-blue-400 text-sm truncate ${
                task.completed
                  ? "line-through text-gray-500 dark:text-gray-400"
                  : "dark:text-white"
              }`}
            >
              {task.title}
            </h3>
          </div>
          <span
            className={`ml-2 px-2 py-0.5 text-xs rounded-full ${priorityClass} whitespace-nowrap`}
          >
            {task.priority}
          </span>
        </div>

        {task.description && (
          <p
            className={`text-xs mt-1 mb-2 ml-6 ${
              task.completed
                ? "text-gray-500 dark:text-gray-400"
                : "text-gray-700 dark:text-gray-300"
            } line-clamp-1`}
          >
            {task.description}
          </p>
        )}

        <div className="flex justify-between items-center mt-2 pt-1 border-t border-gray-100 dark:border-gray-700">
          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatDate(task.createdAt)}
          </span>

          <div className="flex gap-1">
            <button
              onClick={() => setIsDetailModalOpen(true)}
              className="text-xs text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 py-1 px-2"
            >
              View
            </button>
            <button
              onClick={handleEdit}
              className="text-xs text-gray-600 hover:text-yellow-600 dark:text-gray-400 dark:hover:text-yellow-400 py-1 px-2"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="text-xs text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 py-1 px-2"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {/* Task Detail Modal */}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title="Task Details"
      >
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2 dark:text-white">
              {task.title}
            </h3>
            <div
              className={`inline-block px-2 py-1 text-xs rounded-full ${priorityClass} mb-4`}
            >
              {task.priority} priority
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Status
              </h4>
              <p className="flex items-center">
                <span
                  className={`inline-block w-3 h-3 rounded-full mr-2 ${
                    task.completed ? "bg-green-500" : "bg-yellow-500"
                  }`}
                ></span>
                <span>{task.completed ? "Completed" : "In Progress"}</span>
              </p>
            </div>

            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Description
              </h4>
              <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {task.description || "No description provided"}
              </p>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                Created
              </h4>
              <p className="text-gray-700 dark:text-gray-300">
                {formatDate(task.createdAt)}
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
            <Button
              variant="secondary"
              onClick={() => {
                setIsDetailModalOpen(false);
                handleEdit();
              }}
            >
              Edit
            </Button>
            <Button
              variant="primary"
              onClick={() => setIsDetailModalOpen(false)}
            >
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default TaskItem;
