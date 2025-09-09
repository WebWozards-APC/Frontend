import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { User } from "lucide-react";

function Navbar() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
    const handler = () => setIsLoggedIn(!!localStorage.getItem("token"));
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, []);

  return (
    <nav className="h-[70px] relative w-full px-6 md:px-16 lg:px-24 xl:px-32 flex items-center justify-between z-20 bg-white text-gray-700 shadow-[0px_4px_25px_0px_#0000000D] transition-all">
      {/* Logo */}
      <div
        className="text-2xl font-bold text-indigo-600 cursor-pointer"
        onClick={() => navigate("/")}
      >
        Blogify
      </div>

      {/* Desktop Links */}
      <ul className="md:flex hidden items-center gap-10">
        <li>
          <Link className="hover:text-gray-500/80 transition" to="/">
            Home
          </Link>
        </li>
        <li>
          <button
            onClick={() =>
              isLoggedIn ? navigate("/blogs") : navigate("/login")
            }
            className="hover:text-gray-500/80 transition bg-transparent border-none cursor-pointer"
          >
            Blogs
          </button>
        </li>
        <li>
          <Link className="hover:text-gray-500/80 transition" to="/">
            Services
          </Link>
        </li>
        <li>
          <Link className="hover:text-gray-500/80 transition" to="/">
            Contact Us
          </Link>
        </li>
      </ul>

      {/* Desktop Right Side */}
      <div className="hidden md:flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-indigo-100 hover:bg-indigo-200 transition"
              title="Go to Dashboard"
            >
              <User className="w-6 h-6 text-indigo-600" />
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 active:scale-95 transition"
            >
              Get Started
            </Link>
          </>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        aria-label="menu-btn"
        type="button"
        className="menu-btn inline-block md:hidden active:scale-90 transition"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="#000"
        >
          <path d="M 3 7 A 1.0001 1.0001 0 1 0 3 9 L 27 9 A 1.0001 1.0001 0 1 0 27 7 L 3 7 z M 3 14 A 1.0001 1.0001 0 1 0 3 16 L 27 16 A 1.0001 1.0001 0 1 0 27 14 L 3 14 z M 3 21 A 1.0001 1.0001 0 1 0 3 23 L 27 23 A 1.0001 1.0001 0 1 0 27 21 L 3 21 z"></path>
        </svg>
      </button>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-[70px] left-0 w-full bg-white p-6 md:hidden shadow-md">
          <ul className="flex flex-col space-y-4 text-lg">
            <li>
              <Link
                to="/"
                className="text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  isLoggedIn ? navigate("/blogs") : navigate("/login");
                  setMobileMenuOpen(false);
                }}
                className="text-sm text-left w-full"
              >
                Blogs
              </button>
            </li>
            <li>
              <Link
                to="/"
                className="text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </li>
          </ul>

          <div className="mt-6">
            {isLoggedIn ? (
              <>
                <button
                  onClick={() => {
                    navigate("/dashboard");
                    setMobileMenuOpen(false);
                  }}
                  className="w-full mb-3 bg-indigo-100 text-indigo-600 py-2 rounded-full hover:bg-indigo-200 transition"
                >
                  Dashboard
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full block text-center bg-gray-100 text-gray-600 py-2 rounded-full hover:bg-gray-200 transition mb-3"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full block text-center bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-700 transition"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
