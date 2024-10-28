import React from 'react';

const tutorials = [
    {
        title: "HTML",
        description: "Learn the basics of HTML, the standard markup language for creating web pages.",
        link: "/tutorials/html",
    },
    {
        title: "CSS",
        description: "Learn how to style and layout web pages using CSS.",
        link: "/tutorials/css",
    },
    {
        title: "JavaScript",
        description: "Learn the fundamentals of JavaScript, the programming language of the web.",
        link: "/tutorials/javascript",
    },
    {
        title: "React",
        description: "Learn how to build user interfaces using React, a JavaScript library.",
        link: "/tutorials/react",
    },
    {
        title: "Node.js",
        description: "Learn how to build server-side applications using Node.js.",
        link: "/tutorials/nodejs",
    },
];

const Learn = () => {
    return (
        <div className="flex min-h-screen bg-gray-100">
            {/* Sidebar */}
            <nav className="w-1/4 bg-[#0d0d2b] text-white shadow-lg p-5"> {/* Changed background color to blue */}
                <h2 className="text-xl font-bold mb-4">Learning Portal</h2>
                <ul>
                    {tutorials.map((tutorial, index) => (
                        <li key={index} className="mb-2">
                            <a
                                href={tutorial.link}
                                className="font-bold text-white hover:underline"
                            >
                                {tutorial.title}
                            </a>
                            <p className="text-gray-200 text-sm">{tutorial.description}</p>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Main content */}
            <main className="flex-1 p-8 bg-gray-50">
                <h1 className="text-3xl font-semibold mb-4">Welcome to the Learning Portal</h1>
                <p className="text-lg text-gray-700 mb-6">
                    Explore a variety of tutorials and resources to enhance your web development skills.
                </p>

                <h2 className="text-2xl font-semibold mb-3">Featured Tutorials</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tutorials.map((tutorial, index) => (
                        <div
                            key={index}
                            className="bg-white p-4 rounded-lg shadow transition-transform transform hover:scale-105"
                        >
                            <h3 className="text-xl font-semibold mb-2">{tutorial.title}</h3>
                            <p className="text-gray-600">{tutorial.description}</p>
                            <a
                                href={tutorial.link}
                                className="mt-3 inline-block bg-blue-600 text-white rounded py-2 px-4 hover:bg-blue-700"
                            >
                                Start Learning
                            </a>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Learn;
