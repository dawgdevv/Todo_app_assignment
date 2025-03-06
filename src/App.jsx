import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { useSelector, useDispatch } from "react-redux";
import { store } from "./redux/store";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import TaskPage from "./pages/TaskPage";
import Header from "./components/Layout/Header";
import Footer from "./components/Layout/Footer";
import { useEffect } from "react";
import { setTheme } from "./redux/slices/themeSlice";

// Wrapper component to access Redux state
function AppContent() {
  const { theme } = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  // Initialize theme once on app load
  useEffect(() => {
    // Function to initialize theme
    const initTheme = () => {
      // Check for saved theme preference
      const savedTheme = localStorage.getItem("theme");

      if (savedTheme) {
        // Use saved preference if available
        dispatch(setTheme(savedTheme));
      } else {
        // Otherwise check system preference
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches;
        const initialTheme = prefersDark ? "dark" : "light";
        dispatch(setTheme(initialTheme));
      }
    };

    // Run initialization
    initTheme();
  }, [dispatch]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen w-full">
        {/* Apply dark mode to all content */}
        <div className="flex flex-col min-h-screen w-full bg-white dark:bg-gray-900 transition-colors duration-300">
          <Header />
          <main className="flex-grow w-full bg-white dark:bg-gray-900 dark:text-white transition-colors duration-300">
            <div className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/tasks" element={<TaskPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
