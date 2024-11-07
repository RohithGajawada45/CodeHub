import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { close, menu } from "../assets";
import { navLinks } from "../constants";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

  // Check if the user is logged in from localStorage (or use any other state management you prefer)
  const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  
  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // Remove login status from localStorage
    localStorage.removeItem("userEmail"); // Optionally remove user data
    window.location.reload(); // Reload the page to reflect the logout state
  };

  return (
    <nav className="w-full flex py-6 justify-between items-center navbar p-10">
      {/* Replace the image with a styled text logo */}
      <h1 className="text-4xl font-bold text-white logo-text">CodeHub</h1>

      <ul className="list-none sm:flex hidden justify-end items-center flex-1">
        {navLinks.map((nav, index) => (
          <li
            key={nav.id}
            className={`font-poppins font-normal cursor-pointer text-[16px] ${
              active === nav.title ? "text-white" : "text-dimWhite"
            } ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
            onClick={() => setActive(nav.title)}
          >
            <Link to={nav.id === "notifications" ? "/notifications" : `#${nav.id}`}>
              {nav.title}
            </Link>
          </li>
        ))}

        {/* Conditionally render the Logout button if the user is logged in */}
        {storedIsLoggedIn && (
          <li
            className="font-poppins font-normal cursor-pointer text-white"
            onClick={handleLogout}
          >
            Logout
          </li>
        )}
      </ul>

      {/* Mobile View */}
      <div className="sm:hidden flex flex-1 justify-end items-center">
        <img
          src={toggle ? close : menu}
          alt="menu"
          className="w-[28px] h-[28px] object-contain"
          onClick={() => setToggle(!toggle)}
        />

        <div
          className={`${
            !toggle ? "hidden" : "flex"
          } p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl sidebar`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col">
            {navLinks.map((nav, index) => (
              <li
                key={nav.id}
                className={`font-poppins font-medium cursor-pointer text-[16px] ${
                  active === nav.title ? "text-white" : "text-dimWhite"
                } ${index === navLinks.length - 1 ? "mb-0" : "mb-4"}`}
                onClick={() => setActive(nav.title)}
              >
                <Link to={`#${nav.id}`}>{nav.title}</Link>
              </li>
            ))}

            {/* Notification link in mobile view */}
            <li className="font-poppins font-medium cursor-pointer text-[16px] text-white mb-4">
              <Link to="/notifications">Notifications</Link>
            </li>

            {/* Conditionally render the Logout button in mobile view */}
            {storedIsLoggedIn && (
              <li
                className="font-poppins font-medium cursor-pointer text-[16px] text-white mb-4"
                onClick={handleLogout}
              >
                Logout
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
