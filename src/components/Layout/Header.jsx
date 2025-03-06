import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlices";
import { toggleTheme } from "../../redux/slices/themeSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isSidebarOpen) {
        setIsSidebarOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      const sidebar = document.getElementById("mobile-sidebar");
      const hamburgerButton = document.getElementById("hamburger-button");

      if (
        sidebar &&
        !sidebar.contains(event.target) &&
        hamburgerButton &&
        !hamburgerButton.contains(event.target) &&
        isSidebarOpen
      ) {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    if (isSidebarOpen) setIsSidebarOpen(false);
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleNavigation = (path) => {
    if (isSidebarOpen) setIsSidebarOpen(false);
    navigate(path);
  };

  return (
    <>
      <header className="bg-blue-600 dark:bg-gray-800 text-white shadow-md transition-colors duration-300 w-full">
        <div className="container mx-auto py-4 px-4 flex justify-between items-center">
          <div className="flex items-center">
            <button
              id="hamburger-button"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden p-2 mr-2 rounded hover:bg-blue-700 dark:hover:bg-gray-700"
              aria-label="Toggle menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            <h1
              className="text-xl font-bold cursor-pointer"
              onClick={() => handleNavigation("/")}
            >
              TodoApp
            </h1>
          </div>

          {/* Desktop Navigation with Profile */}
          <div className="hidden md:flex items-center">
            {user && (
              <div className="flex items-center mr-6 border-r pr-6 border-blue-400 dark:border-gray-600">
                <div className="bg-blue-700 dark:bg-gray-700 rounded-full h-8 w-8 flex items-center justify-center mr-2">
                  <span className="text-sm font-semibold">
                    {user.name?.charAt(0)?.toUpperCase() || "U"}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs opacity-75">{user.email}</p>
                </div>
              </div>
            )}

            <nav className="mr-4">
              <ul className="flex space-x-4">
                <li>
                  <button
                    onClick={() => handleNavigation("/")}
                    className="hover:text-blue-200 dark:hover:text-gray-300 transition"
                  >
                    Home
                  </button>
                </li>

                {user ? (
                  <>
                    <li>
                      <button
                        onClick={() => handleNavigation("/tasks")}
                        className="hover:text-blue-200 dark:hover:text-gray-300 transition"
                      >
                        Tasks
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="hover:text-blue-200 dark:hover:text-gray-300 transition"
                      >
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <button
                      onClick={() => handleNavigation("/login")}
                      className="hover:text-blue-200 dark:hover:text-gray-300 transition"
                    >
                      Login
                    </button>
                  </li>
                )}
              </ul>
            </nav>

            {/* Theme toggle button */}
            <button
              onClick={handleToggleTheme}
              className="p-2 rounded-full hover:bg-blue-700 dark:hover:bg-gray-700 focus:outline-none"
              aria-label={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
            >
              {theme === "light" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Theme Toggle Only */}
          <div className="md:hidden">
            <button
              onClick={handleToggleTheme}
              className="p-2 rounded-full hover:bg-blue-700 dark:hover:bg-gray-700 focus:outline-none"
              aria-label={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
            >
              {theme === "light" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div
        id="mobile-sidebar"
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg z-50 transform transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold dark:text-white">TodoApp</h2>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-1 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Profile Section in Sidebar */}
        {user && (
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <div className="bg-blue-600 dark:bg-gray-700 rounded-full h-12 w-12 flex items-center justify-center mr-3">
                <span className="text-lg font-bold text-white">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {user.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="p-4">
          <ul className="space-y-3">
            <li>
              <button
                onClick={() => handleNavigation("/")}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors"
              >
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-3"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  Home
                </span>
              </button>
            </li>

            {user ? (
              <>
                <li>
                  <button
                    onClick={() => handleNavigation("/tasks")}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors"
                  >
                    <span className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path
                          fillRule="evenodd"
                          d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Tasks
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors"
                  >
                    <span className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-3"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm11 4a1 1 0 10-2 0v4.586l-1.293-1.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L14 11.586V7z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Logout
                    </span>
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={() => handleNavigation("/login")}
                  className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition-colors"
                >
                  <span className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-3"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 011 1v12a1 1 0 01-1 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm5.707 8.707a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L7.414 15H15a1 1 0 100-2H7.414l1.293-1.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Login
                  </span>
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
}

export default Header;
