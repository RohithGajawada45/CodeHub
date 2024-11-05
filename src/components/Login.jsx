import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [adminData, setAdminData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const toggleView = () => {
    setIsLoginActive(!isLoginActive);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    localStorage.setItem(userData.email, JSON.stringify(userData));
    alert("Registration successful! Please log in.");
    setUserData({ email: "", password: "" });
    setIsLoginActive(true);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const storedUser = JSON.parse(localStorage.getItem(userData.email));
    if (storedUser && storedUser.password === userData.password) {
      alert("Login successful!");
      navigate("/");
    } else {
      alert("Invalid credentials, please try again.");
    }
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    if (adminData.email === "admin@test.com" && adminData.password === "admin123") {
      alert("Admin login successful!");
      setAdminData({email:"",password:""});
      navigate("/admin");
    } else {
      alert("Invalid admin credentials.");
      setAdminData({email:"",password:""});
    }
  };

  return (
    <div className="auth-container bg-discount-gradient">
      <div className={`auth-panel ${isLoginActive ? "login-active" : "register-active"}`}>
        <div className="form-container bg-black-gradient-2 boder border-white/20">
          {!isAdminLogin ? (
            <>
              <div className="login-form">
                <h2 className="text-gradient font-bold text-xl">Login</h2>
                <form onSubmit={handleLogin}>
                  <input
                    type="email"
                    placeholder="Email"
                    className="rounded"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    required
                  />
                  <input
                    type="password"
                    className="rounded"
                    placeholder="Password"
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    required
                  />
                  <button type="submit" className="bg-blue-gradient text-black font-bold">Login</button>
                </form>
                <button onClick={() => setIsAdminLogin(true)} className="admin-link text-gradient">
                  Login as Admin
                </button>
              </div>
              <div className="register-form">
                <h2 className="text-gradient font-bold">Register</h2>
                <form onSubmit={handleRegister}>
                  <input
                    type="email"
                    placeholder="Email"
                    className="rounded"
                    value={userData.email}
                    onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                    required
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="rounded"
                    value={userData.password}
                    onChange={(e) => setUserData({ ...userData, password: e.target.value })}
                    required
                  />
                  <button type="submit" className="bg-blue-gradient font-bold text-black">Register</button>
                </form>
              </div>
            </>
          ) : (
            <div className="admin-login-form">
              <h2>Admin Login</h2>
              <form onSubmit={handleAdminLogin}>
                <input
                  type="email"
                  placeholder="Admin Email"
                  className="rounded"
                  value={adminData.email}
                  onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
                  required
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="rounded"
                  value={adminData.password}
                  onChange={(e) => setAdminData({ ...adminData, password: e.target.value })}
                  required
                />
                <button type="submit" className="bg-blue-gradient font-bold text-black">Login as Admin</button>
              </form>
              <button onClick={() => setIsAdminLogin(false)} className=" text-gradient admin-link">
                Back to User Login
              </button>
            </div>
          )}
        </div>
        {!isAdminLogin && (
          <div className="toggle-container">
            <button onClick={toggleView} className="bg-blue-gradient text-black font-bold rounded-full">
              {isLoginActive ? "Switch to Register" : "Switch to Login"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
