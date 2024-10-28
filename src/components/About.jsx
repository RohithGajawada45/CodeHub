import React from 'react';
// Import social media icons if using an icon library like Font Awesome or similar
// import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaGithub } from 'react-icons/fa';

const About = () => {
  return (
    <div className="bg-gray-100 text-gray-800 font-sans min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-6 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Know About Us</h1>
          <p className="text-lg md:text-2xl">
            We're passionate about empowering developers and businesses with our solutions.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-16 px-6 md:px-0">
        <div className="container mx-auto text-center md:text-left md:flex md:items-center">
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg leading-relaxed text-gray-600">
              At CodeHub, we strive to create tools and services that streamline workflows,
              enhance productivity, and foster collaboration among teams and individuals globally.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="bg-gray-200 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Meet Our Team</h2>
          <div className="flex flex-wrap justify-center gap-8">
            {['Member 1', 'Member 2', 'Member 3'].map((member, index) => (
              <div key={index} className="w-full md:w-1/4 bg-white rounded-lg shadow-lg p-4">
                <div className="bg-gray-300 h-40 w-full rounded-md mb-4"></div>
                <h3 className="font-bold text-lg"> {member} </h3>
                <p className="text-sm text-gray-600">Role of {member}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 px-6 bg-gradient-to-br from-blue-800 to-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Connect With Us</h2>
          <p className="mb-8">Follow us on social media to stay updated with our latest news and updates.</p>
          <div className="flex justify-center space-x-6">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-2xl">
              {/* <FaFacebook /> */} Facebook
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-2xl">
              {/* <FaTwitter /> */} Twitter
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-2xl">
              {/* <FaLinkedin /> */} LinkedIn
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-2xl">
              {/* <FaInstagram /> */} Instagram
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-2xl">
              {/* <FaGithub /> */} GitHub
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
