import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styles from "./style";
import { Billing, Business, CardDeal, Clients, CTA, Footer, Navbar, Stats, Testimonials, Hero } from "./components";
import FeaturesSection from "./components/FeaturesSection";

const App = () => (
  <Router>
    <div className="bg-primary w-full overflow-hidden">
      <div className={`${styles.paddingX} ${styles.flexCenter}`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>

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
      </Routes>
    </div>
  </Router>
);

export default App;
