import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styles from "./style";
import { Billing, Business, CardDeal, Clients, CTA, Footer, Navbar, Stats, Testimonials, Hero ,Team } from "./components";
import FeaturesSection from "./components/FeaturesSection";
import Learn from "./components/Learn";
import About from "./components/About";
import Pricingpage from "./components/Pricingpage";

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
        <Route path="/team" element={<Team/>}/>
        <Route path="/learn" element={<Learn/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/pricing" element={<Pricingpage/>}/>
      </Routes>
    </div>
  </Router>
);

export default App;
