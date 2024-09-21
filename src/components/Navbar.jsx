import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaCamera, FaHome, FaSignInAlt, FaUserPlus } from "react-icons/fa"; // Importing necessary icons

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigation = [
    { name: "Home", navLink: "/", icon: FaHome },
    { name: "Login", navLink: "/login", icon: FaSignInAlt },
    { name: "Registration", navLink: "/registration", icon: FaUserPlus },
  ];

  return (
    <header className="fixed w-full z-50">
      <nav className="bg-gray-800 bg-opacity-50 backdrop-blur-lg backdrop-filter p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="flex items-center text-white text-xl font-bold"
          >
            <FaCamera className="mr-2" /> {/* Adding the camera icon */}
            Photo-Gram
          </Link>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              ☰
            </button>
          </div>
          <ul
            className={`flex-col md:flex md:flex-row md:space-x-4 ${
              isOpen ? "block" : "hidden"
            } md:block`}
          >
            {navigation.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.navLink}
                  className="flex items-center text-white hover:text-gray-400 transition-colors py-2 px-4 md:py-0"
                >
                  <item.icon className="mr-2" /> {/* Adding the icon */}
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
