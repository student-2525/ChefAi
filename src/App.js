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
import AdminLogin from "./pages/AdminLogin"; // ✅ new admin portal
import Index from "./pages/Index"; // main ChefBOT dashboard

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Routes>
        {/* 🔐 Login Page */}
        <Route
          path="/login"
          element={<LoginPage setIsAuthenticated={setIsAuthenticated} />}
        />

        {/* 🧾 Create Account Page */}
        <Route path="/create-account" element={<CreateAccount />} />

        {/* 🛡️ Admin Login Page */}
        <Route path="/admin" element={<AdminLogin />} />

        {/* 🍳 Protected Main Page (ChefBOT Dashboard) */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Index />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* 🚫 Redirect any unknown routes to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
