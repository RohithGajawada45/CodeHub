import React from 'react';

const Pricingpage = () => {
  return (
    <div className="bg-gray-100 text-gray-800 min-h-screen font-sans">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Choose Your Plan</h1>
        <p className="text-lg md:text-xl">
          Pick a plan that fits your needs and start building your project today.
        </p>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-16 px-6 md:px-0">
        <div className="container mx-auto flex flex-col md:flex-row gap-8 justify-center">
          {/* Pricing Card 1 - Basic */}
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm text-center transform transition duration-500 hover:scale-105">
            <h2 className="text-2xl font-semibold mb-4">Basic</h2>
            <p className="text-gray-600 mb-6">Ideal for individuals getting started</p>
            <div className="text-4xl font-bold text-blue-600 mb-6">
              $10<span className="text-lg font-normal">/month</span>
            </div>
            <ul className="text-gray-600 mb-8 space-y-4">
              <li> 10 Projects</li>
              <li> Basic Analytics</li>
              <li> Community Support</li>
              <li> 5GB Storage</li>
            </ul>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700">
              Get Started
            </button>
          </div>

          {/* Pricing Card 2 - Pro */}
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm text-center transform transition duration-500 hover:scale-105 border-2 border-indigo-500">
            <h2 className="text-2xl font-semibold mb-4">Pro</h2>
            <p className="text-gray-600 mb-6">Perfect for growing teams</p>
            <div className="text-4xl font-bold text-indigo-600 mb-6">
              $30<span className="text-lg font-normal">/month</span>
            </div>
            <ul className="text-gray-600 mb-8 space-y-4">
              <li> 50 Projects</li>
              <li> Advanced Analytics</li>
              <li> Priority Support</li>
              <li> 50GB Storage</li>
            </ul>
            <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg w-full hover:bg-indigo-700">
              Get Started
            </button>
          </div>

          {/* Pricing Card 3 - Enterprise */}
          <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm text-center transform transition duration-500 hover:scale-105">
            <h2 className="text-2xl font-semibold mb-4">Enterprise</h2>
            <p className="text-gray-600 mb-6">Best for organizations and businesses</p>
            <div className="text-4xl font-bold text-blue-600 mb-6">
              $100<span className="text-lg font-normal">/month</span>
            </div>
            <ul className="text-gray-600 mb-8 space-y-4">
              <li> Unlimited Projects</li>
              <li> Advanced Analytics & Insights</li>
              <li> Dedicated Account Manager</li>
              <li> 500GB Storage</li>
            </ul>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-700">
              Get Started
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Pricingpage;
