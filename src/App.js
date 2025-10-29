import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// ✅ Import all pages
import LoginPage from "./pages/LoginPage";
import CreateAccount from "./pages/CreateAccount";
import AdminLogin from "./pages/AdminLogin"; // ✅ Admin portal
import Index from "./pages/Index"; // ✅ Main ChefBOT dashboard

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        {/* 🔐 User Login Page */}
        <Route
          path="/login"
          element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />

        {/* 🧾 Create Account Page */}
        <Route path="/create-account" element={<CreateAccount />} />

        {/* 🛡️ Admin Login Page (passes setIsAuthenticated too ✅) */}
        <Route
          path="/admin"
          element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />}
        />

        {/* 🍳 Protected ChefBOT Dashboard */}
        <Route
          path="/"
          element={
            isAuthenticated ? <Index /> : <Navigate to="/login" replace />
          }
        />

        {/* 🚫 Redirect any unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
