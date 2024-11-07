import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styles from "./style";
import { Billing, Business, CardDeal, Clients, CTA, Footer, Stats, Testimonials, Hero, Team } from "./components";
import FeaturesSection from "./components/FeaturesSection";
import Learn from "./components/Learn";
import About from "./components/About";
import Pricingpage from "./components/Pricingpage";
import Form from "./components/Form";
import Admin from "./components/Admin";
import Gemini from "./components/Gimini";
import Login from "./components/Login";
import UserNotification from "./components/UserNotification"; // Import UserNotification

const App = () => {
  // Check if the user is logged in when the component mounts
  const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const storedUserEmail = localStorage.getItem("userEmail");

  const [isLoggedIn, setIsLoggedIn] = useState(storedIsLoggedIn); // State to track login status
  const [userEmail, setUserEmail] = useState(storedUserEmail || ""); // State to store the user's email

  // Function to handle successful login
  const handleLoginSuccess = (email) => {
    console.log("Email received in App.js:", email); // Debugging: Log the email in App.js
    setIsLoggedIn(true); // Update login status to true
    setUserEmail(email); // Store the email
    localStorage.setItem("isLoggedIn", "true"); // Save login status to localStorage
    localStorage.setItem("userEmail", email); // Save user email to localStorage
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail("");
    localStorage.removeItem("isLoggedIn"); // Remove login status from localStorage
    localStorage.removeItem("userEmail"); // Remove user email from localStorage
  };

  return (
    <Router>
      <div className="bg-primary w-full overflow-hidden">
        <div className={`${styles.paddingX} ${styles.flexCenter}`}>
          <div className={`${styles.boxWidth}`}>
            {/* Conditionally render login or app content based on isLoggedIn */}
            {!isLoggedIn ? (
              <Login onLoginSuccess={handleLoginSuccess} /> // Pass login success handler to Login component
            ) : (
              // Render app content if logged in
              <Routes>
                <Route
                  path="/"
                  element={
                    <div>
                      <div className={`bg-primary ${styles.flexStart}`}>
                        <div className={`${styles.boxWidth}`}>
                          <Hero />
                        </div>
                      </div>

                      <div className={`bg-primary ${styles.paddingX} ${styles.flexCenter}`}>
                        <div className={`${styles.boxWidth}`}>
                          <Stats />
                          <Business />
                          <Billing />
                          <CardDeal />
                          <Testimonials />
                          <Clients />
                          <CTA />
                          <Footer />
                        </div>
                      </div>
                    </div>
                  }
                />
                <Route path="/features" element={<FeaturesSection />} />
                <Route path="/team" element={<Team />} />
                <Route path="/learn" element={<Learn />} />
                <Route path="/about" element={<About />} />
                <Route path="/pricing" element={<Pricingpage />} />
                <Route path="/success" element={<Form />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/gemini" element={<Gemini />} />
                <Route path="/notifications" element={<UserNotification email={userEmail} />} /> {/* Pass email as prop */}
              </Routes>
            )}
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
