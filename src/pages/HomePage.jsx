import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function HomePage() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center transition-colors duration-300">
      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
        Welcome to TodoApp
      </h1>
      <p className="text-xl mb-8 text-gray-600 dark:text-gray-300 max-w-md">
        Organize your tasks efficiently with our intuitive todo application
      </p>

      <div className="flex gap-4">
        <button
          onClick={() => handleNavigation("/login")}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>
        <button
          onClick={() => handleNavigation("/tasks")}
          className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default HomePage;
