import { useState } from "react";

function Register({ onSubmit, loading }) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(userData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium mb-1 dark:text-gray-200"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={userData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
      </div>

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
          value={userData.email}
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
          value={userData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
      </div>

      <div className="mb-4">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium mb-1 dark:text-gray-200"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={userData.confirmPassword}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300 disabled:bg-green-400"
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>
  );
}

export default Register;
