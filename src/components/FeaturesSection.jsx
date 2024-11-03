import React from "react";
import { useNavigate } from 'react-router-dom';
import "../index.css"

const features = [
  {
    title: "Create Space",
    description: "Create your own secured private space now",
  },
  {
    title: "Learn Git Server Creation",
    description: "Access the comprehensive documentation about the space creation.",
  },
  {
    title: "Real-time Support",
    description: "Use Gemini AI to resolve your issues",
  },
  {
    title: "Terminal Based Learning",
    description: "Know the step by step process",
  },
];

const FeaturesSection = () => {
  const navigate = useNavigate();

  const handleClick = (feature) => {
    if (feature.title === "Create Space") {
      navigate("/team");
    }
    
    else if(feature.title === "Learn Git Server Creation")
    {
      navigate("/learn")
    }

    else if(feature.title === "Know About Us")
    {
      navigate("/about")
    }
    
    else if(feature.title === "Know The Pricing"){
      navigate("/pricing")
    }

    else if(feature.title === 'Real-time Support')
    {
      navigate("/gemini");
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-discount-gradient">
      <h1 className="text-gradient font-semibold text-5xl mb-4 text-center">Features</h1>
      <br></br>
      <div className="grid grid-cols-1 gap-8 max-w-5xl w-full md:grid-cols-2 cursor-pointer">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-black-gradient-2 p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl border border-white/20"
            onClick={() => handleClick(feature)}
          >
            <h2 className="text-gradient font-semibold text-2xl mb-3">{feature.title}</h2>
            <p className="text-center text-dimWhite text-base leading-6">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
