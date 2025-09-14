import React from "react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-slate-50 border-t border-gray-200 text-gray-700">
      <div className="max-w-6xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-3 text-sm">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Blogify</h2>
          <p className="mt-3 text-gray-600 leading-relaxed">
            A modern blogging platform to share your ideas with the world. 
            Stay connected and keep writing!
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2">
          <h3 className="text-gray-800 font-medium mb-2">Quick Links</h3>
          <a href="#" className="hover:text-black transition-colors">
            About Us
          </a>
          <a href="#" className="hover:text-black transition-colors">
            Contact
          </a>
          <a href="#" className="hover:text-black transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-black transition-colors">
            Terms of Service
          </a>
        </div>

        {/* Socials */}
        <div>
          <h3 className="text-gray-800 font-medium mb-2">Follow Us</h3>
          <div className="flex space-x-6 text-lg">
            <a
              href="#"
              aria-label="Twitter"
              className="hover:text-[#1DA1F2] transition-colors"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="hover:text-[#0077B5] transition-colors"
            >
              <FaLinkedin />
            </a>
            <a
              href="#"
              aria-label="GitHub"
              className="hover:text-black transition-colors"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-200 text-center py-4 text-gray-600 text-sm">
        © {new Date().getFullYear()} Blogify. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
