import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../redux/thunks";
import { clearErrors } from "../redux/slices/authSlices";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";

function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/tasks", { replace: true });
    }
  }, [user, navigate]);

  const handleLogin = async (credentials) => {
    try {
      // Dispatch the login action and wait for it to complete
      await dispatch(loginUser(credentials)).unwrap();
      // If login is successful (no error thrown), navigate to tasks
      navigate("/tasks", { replace: true });
    } catch (error) {
      console.error("Login failed:", error);
      // Error is already handled in the reducer
    }
  };

  const handleRegister = async (userData) => {
    try {
      // Dispatch the register action and wait for it to complete
      await dispatch(registerUser(userData)).unwrap();
      // If registration is successful (no error thrown), navigate to tasks
      navigate("/tasks", { replace: true });
    } catch (error) {
      console.error("Registration failed:", error);
      // Error is already handled in the reducer
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    dispatch(clearErrors());
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">
        {isLogin ? "Login to Your Account" : "Create an Account"}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300 rounded-md text-sm">
          {error}
        </div>
      )}

      {isLogin ? (
        <Login onSubmit={handleLogin} loading={loading} />
      ) : (
        <Register onSubmit={handleRegister} loading={loading} />
      )}

      <div className="mt-4 text-center">
        <button
          onClick={toggleForm}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
        >
          {isLogin
            ? "Need an account? Register"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
