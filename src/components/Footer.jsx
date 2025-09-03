import React from "react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#F9FAFB] py-8 mt-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <p className="text-gray-600 text-sm">
          © Blogify {new Date().getFullYear()}
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0 text-gray-600">
          <a
            href="#"
            className="hover:text-[#4A90E2] transition-colors text-xl"
          >
            <FaTwitter />
          </a>
          <a
            href="#"
            className="hover:text-[#4A90E2] transition-colors text-xl"
          >
            <FaLinkedin />
          </a>
          <a
            href="#"
            className="hover:text-[#4A90E2] transition-colors text-xl"
          >
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
