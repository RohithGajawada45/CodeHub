import React, { useState } from "react";
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

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  // Function to handle successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true); // Update login status to true
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
              </Routes>
            )}
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
