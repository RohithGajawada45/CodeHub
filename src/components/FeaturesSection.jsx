import React from "react";

const features = [
  {
    title: "Create Space",
    description: "Detailed description of Create dfbsjdbfsdjfjsdd, explaining its benefits and how it enhances productivity.",
  },
  {
    title: "Learn Git Server Creation",
    description: "Detailed description of Create Spaifdjfkdjjkfdce, explaining its benefits and how it enhances productivity.",
  },
  {
    title: "Know The Pricing",
    description: "Detailed description of Create Space, explaining its benefits and how it enhances productivity.",
  },
  {
    title: "Know About Us",
    description: "Detailed description of Create Space, explaining its benefits and how it enhances productivity.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-primary w-full p-8">
      <h1 className="text-secondary font-semibold text-5xl mb-4 text-center">Features</h1>
      <p className="text-center text-dimWhite text-lg leading-7 mb-12 max-w-2xl">
        Explore the various features that streamline project management, enhance collaboration, and empower developers to work efficiently. Our tools are tailored to meet the demands of modern software development, helping you stay organized and productive.
      </p>

      <div className="grid grid-cols-1 gap-8 max-w-5xl w-full md:grid-cols-2">
        {features.map((feature, index) => (
          <div
            key={index}
            className="bg-[#0d0d2b] p-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl border border-white/20"
          >
            <h2 className="text-secondary font-semibold text-2xl mb-3">{feature.title}</h2>
            <p className="text-dimWhite text-base leading-6">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
