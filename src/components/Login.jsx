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
    <div className="auth-container bg-discount-gradient">
      <div className={`auth-panel ${isLoginActive ? "login-active" : "register-active"} bg-black-gradient-2`}>
        <div className="form-container bg-black-gradient-2 border border-white/20 p-6 rounded-lg">
          {!isAdminLogin ? (
            <>
              <div className="login-form">
                <h2 className="text-gradient font-bold text-2xl mb-4">Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    required
                  />
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Password"
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    required
                  />
                  <button type="submit" className="w-full bg-blue-gradient text-black font-bold py-2 rounded-md hover:bg-blue-600 transition duration-300">Login</button>
                </form>
                <button onClick={() => setIsAdminLogin(true)} className="admin-link text-gradient mt-4 font-medium hover:text-blue-500">
                  Login as Admin
                </button>
              </div>
              <div className="register-form">
                <h2 className="text-gradient font-bold text-2xl mb-4">Register</h2>
                <form onSubmit={handleRegister} className="space-y-4">
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    required
                  />
                  <button type="submit" className="w-full bg-blue-gradient font-bold py-2 rounded-md ">Register</button>
                </form>
              </div>
            </>
          ) : (
            <div className="admin-login-form">
              <h2 className="font-bold text-gradient mb-4">Admin Login</h2>
              <form onSubmit={handleAdminLogin} className="space-y-4 ">
                <input
                  type="email"
                  placeholder="Admin Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={adminData.email}
                  onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={adminData.password}
                  onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
                  required
                />
                <button type="submit" className="w-full bg-blue-gradient text-black font-bold py-2 rounded-md hover:bg-blue-600 transition duration-300">Login as Admin</button>
              </form>
              <button onClick={() => setIsAdminLogin(false)} className="text-gradient admin-link mt-4 font-medium hover:text-blue-500">
                Back to User Login
              </button>
            </div>
          )}
        </div>
        {!isAdminLogin && (
          <div className="toggle-container mt-6 text-center">
            <button onClick={toggleView} className="bg-blue-gradient text-black font-bold py-2 px-4 rounded-full">
              {isLoginActive ? "Switch to Register" : "Switch to Login"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
