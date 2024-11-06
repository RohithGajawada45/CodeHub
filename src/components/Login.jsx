import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase"; // Firebase Auth
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"; // Firebase auth functions
import "./login.css"; // Your CSS file

const Login = ({ onLoginSuccess }) => {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [adminData, setAdminData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Toggle between login and register views
  const toggleView = () => {
    setIsLoginActive(!isLoginActive);
  };

  // Register a new user
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, userData.email, userData.password);
      alert("Registration successful! Please log in.");
      setUserData({ email: "", password: "" }); // Reset form fields
      setIsLoginActive(true); // Switch to login view
    } catch (error) {
      alert(error.message); // Display error
    }
  };

  // Login an existing user
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, userData.email, userData.password);
      alert("Login successful!");
      console.log("User logged in with email:", userData.email); // Debugging: Log the email
      onLoginSuccess(userData.email); // Pass the email to the parent component
      navigate("/"); // Redirect to the home page after successful login
    } catch (error) {
      alert("Invalid credentials, please try again."); // Display error
    }
  };

  // Login an admin (local validation only, not using Firebase Auth)
  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminData.email === "admin@test.com" && adminData.password === "admin123") {
      alert("Admin login successful!");
      console.log("Admin logged in with email:", adminData.email); // Debugging: Log the email
      setAdminData({ email: "", password: "" });
      onLoginSuccess(adminData.email); // Pass admin email to the parent component
      navigate("/admin");
    } else {
      alert("Invalid admin credentials.");
      setAdminData({ email: "", password: "" });
    }
  };
  

  return (
    <div className="auth-container">
      <div className={`auth-panel ${isLoginActive ? "login-active" : "register-active"}`}>
        <div className="form-container">
          {!isAdminLogin ? (
            <>
              {/* User Login Form */}
              <div className="login-form">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                  <input
                    className="input-field"
                    type="email"
                    placeholder="Email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    required
                  />
                  <input
                    className="input-field"
                    type="password"
                    placeholder="Password"
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    required
                  />
                  <button className="login-button" type="submit">Login</button>
                </form>
                <button className="switch-button" onClick={() => setIsAdminLogin(true)}>Login as Admin</button>
              </div>

              {/* User Register Form */}
              <div className="register-form">
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
                  <input
                    className="input-field"
                    type="email"
                    placeholder="Email"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    required
                  />
                  <input
                    className="input-field"
                    type="password"
                    placeholder="Password"
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    required
                  />
                  <button className="register-button" type="submit">Register</button>
                </form>
              </div>
            </>
          ) : (
            <div className="admin-login-form">
              <h2>Admin Login</h2>
              <form onSubmit={handleAdminLogin}>
                <input
                  className="input-field"
                  type="email"
                  placeholder="Admin Email"
                  value={adminData.email}
                  onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                  required
                />
                <input
                  className="input-field"
                  type="password"
                  placeholder="Password"
                  value={adminData.password}
                  onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
                  required
                />
                <button className="admin-login-button" type="submit">Login as Admin</button>
              </form>
              <button className="switch-button" onClick={() => setIsAdminLogin(false)}>Back to User Login</button>
            </div>
          )}
        </div>

        {/* Toggle Button for Switching Views */}
        {!isAdminLogin && (
          <div className="toggle-container">
            <button className="switch-button" onClick={toggleView}>
              {isLoginActive ? "Switch to Register" : "Switch to Login"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
