import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const LoginPage = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Simple validation for now
    if (email.trim() !== "" && password.trim() !== "") {
      setIsAuthenticated(true);
      navigate("/"); // Redirect to main ChefBOT dashboard
    } else {
      alert("Please enter both email and password!");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-logo">
          <div className="logo-icon">
            <i className="fas fa-robot"></i>
          </div>
          <h2>ChefBOT</h2>
          <p>SGH Hospital Room Service</p>
        </div>

        {/* ✅ Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

          <div className="divider">
            <span>OR</span>
          </div>

          {/* ✅ Navigation to Create Account */}
          <p className="no-account">
            Don’t have an account?{" "}
            <button
              type="button"
              className="link-btn"
              onClick={() => navigate("/create-account")}
            >
              Register as Patient
            </button>
          </p>

          {/* ✅ Navigation to Admin Login */}
          <button
            type="button"
            className="link-btn admin-link"
            onClick={() => navigate("/admin")}
          >
            Admin Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
