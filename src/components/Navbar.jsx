import { useState } from "react";
import { Link } from "react-router-dom"; // Import Link for navigation
import { close, menu } from "../assets";
import { navLinks } from "../constants";
// import codehub1 from '../assets/codehub1.png';

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [toggle, setToggle] = useState(false);

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
        
      </ul>

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
                <Link to={`#${nav.id}`}>{nav.title}</Link> {/* Use Link here */}
              </li>
            ))}
            
            {/* Notification link in mobile view */}
            <li className="font-poppins font-medium cursor-pointer text-[16px] text-white mb-4">
              <Link to="/notifications">Notifications</Link> {/* Correct Link usage */}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
