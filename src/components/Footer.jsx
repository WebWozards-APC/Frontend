import React from "react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center justify-center w-full py-12 px-6 text-sm bg-slate-50 text-gray-800/70 border-t border-gray-200">
      {/* Logo */}
      <svg
        width="157"
        height="40"
        viewBox="0 0 157 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* simplified path kept */}
        <path
          d="M8.75 11.3 15.5 15.184 22.25 11.3M8.75 34.58v-7.755L2 22.939m27 0-6.75 3.885v7.754M2.405 15.408 15.5 22.954l13.095-7.546M15.5 38V22.939M29 28.915V16.962a2.98 2.98 0 0 0-1.5-2.585L17 8.4a3.01 3.01 0 0 0-3 0L3.5 14.377A3 3 0 0 0 2 16.962v11.953A2.98 2.98 0 0 0 3.5 31.5L14 37.477a3.01 3.01 0 0 0 3 0L27.5 31.5a3 3 0 0 0 1.5-2.585"
          stroke="#4F39F6"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Copyright */}
      <p className="mt-4 text-center text-gray-600">
        © Blogify {new Date().getFullYear()}. All rights reserved.
      </p>

      {/* Links */}
      <div className="flex items-center gap-6 mt-4 text-gray-700">
        <a
          href="#"
          className="font-medium hover:text-black transition-all text-sm"
        >
          Brand Guidelines
        </a>
        <span className="h-4 w-px bg-black/20"></span>
        <a
          href="#"
          className="font-medium hover:text-black transition-all text-sm"
        >
          Trademark Policy
        </a>
      </div>

      {/* Social Icons */}
      <div className="flex space-x-6 mt-6 text-gray-600">
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
    </footer>
  );
};

export default Footer;
