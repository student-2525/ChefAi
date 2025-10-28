import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/createAccount.css";

const CreateAccount = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    room: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save user data to localStorage for demo
    localStorage.setItem("user", JSON.stringify(formData));

    alert("Account created successfully!");
    navigate("/login");
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-logo">
          <div className="icon">👤</div>
          <h2>Create Account</h2>
          <p>Register as a patient</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Full Name *</label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email Address *</label>
            <input
              type="email"
              name="email"
              placeholder="anas@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password *</label>
            <input
              type="password"
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex-row">
            <div className="input-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Optional"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Room Number</label>
              <input
                type="text"
                name="room"
                placeholder="Optional"
                value={formData.room}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" className="register-btn">
            Create Account
          </button>

          <p className="already-account">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")}>Login Here</span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default CreateAccount;
