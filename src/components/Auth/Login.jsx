import { useState } from "react";

function Login({ onSubmit, loading }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(credentials);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium mb-1 dark:text-gray-200"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={credentials.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-sm font-medium mb-1 dark:text-gray-200"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-blue-400"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}

export default Login;
