import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md fixed w-full top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-[#4A90E2]">Blogify</h1>
        <ul className="hidden md:flex space-x-6 text-gray-700 font-medium">
          {["Home", "Blogs", "About", "Contact", "Login/Register"].map(
            (item) => (
              <li
                key={item}
                className="hover:text-[#4A90E2] cursor-pointer transition-colors"
              >
                {item}
              </li>
            )
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
