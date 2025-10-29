import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/adminLogin.css";

const AdminLogin = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Only allow specific admin credentials
    if (email === "admin@gmail.com" && password === "Admin@123") {
      alert("✅ Admin login successful!");
      setIsAuthenticated(true); // ✅ Marks admin as authenticated
      navigate("/"); // ✅ Go directly to ChefBOT dashboard
    } else {
      alert("❌ Invalid admin credentials!");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <div className="admin-logo">
          <div className="admin-icon">
            <i className="fas fa-shield-alt"></i>
          </div>
          <h2>Admin Portal</h2>
          <p>SGH Hospital Management</p>
          <span className="admin-badge">Administrator Access</span>
        </div>

        <br />

        <div className="default-credentials">
          <i className="fas fa-exclamation-circle"></i>&nbsp;
          Default credentials: <b>@gmail.com</b> / <b>Admin@123</b>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="admin@gmail.com"
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

          <button type="submit" className="admin-btn">
            Admin Login
          </button>

          <button
            type="button"
            className="back-btn"
            onClick={() => navigate("/login")}
          >
            ← Back to Patient Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
