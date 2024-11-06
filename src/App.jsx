import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styles from "./style";
import { Billing, Business, CardDeal, Clients, CTA, Footer, Navbar, Stats, Testimonials, Hero, Team } from "./components";
import FeaturesSection from "./components/FeaturesSection";
import Learn from "./components/Learn";
import About from "./components/About";
import Pricingpage from "./components/Pricingpage";
import Form from "./components/Form";
import Admin from "./components/Admin";
import Gemini from "./components/Gimini";
import Login from "./components/Login";

const App = () => (
  <Router>
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
        </div>
      </div>

      <Routes>
        {/* Set Login page as the default landing page */}
        <Route
          path="/"
          element={<Login />}
        />

        <Route path="/features" element={<FeaturesSection />} />
        <Route path="/team" element={<Team />} />
        <Route path="/learn" element={<Learn />} />
        <Route path="/about" element={<About />} />
        <Route path="/pricing" element={<Pricingpage />} />
        <Route path="/success" element={<Form />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/gemini" element={<Gemini />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  </Router>
);

export default App;
