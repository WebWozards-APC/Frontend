import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/blogs";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("http://localhost:8080/api/users/login", {
        email,
        password,
      });

      if (res.data && res.data.id && res.data.roles) {
        localStorage.setItem("userId", res.data.id);
        localStorage.setItem("roles", JSON.stringify(res.data.roles));
        localStorage.setItem("token", "logged-in"); // dummy token
        if (res.data.email) {
          localStorage.setItem("email", res.data.email);
        }
        if (res.data.name) {
          localStorage.setItem("name", res.data.name);
        }

        window.dispatchEvent(new Event("storage")); // update navbar
        setShouldRedirect(true);
      } else {
        setError(res.data?.message || "Unexpected response from server");
      }
    } catch (err) {
      if (err.response) {
        setError(
          err.response.data?.message ||
            (err.response.status === 401
              ? "Invalid email or password"
              : `Error: ${err.response.status}`)
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  useEffect(() => {
    if (shouldRedirect) {
      navigate(from, { replace: true });
    }
  }, [shouldRedirect, navigate, from]);

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form
        onSubmit={handleLogin}
        className="bg-white text-gray-500 max-w-[350px] mx-4 md:p-6 p-4 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">
          Login Now
        </h2>

        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}

        <input
          id="email"
          className="w-full border my-3 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          id="password"
          className="w-full border mt-1 border-gray-500/30 outline-none rounded-full py-2.5 px-4"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="text-right py-4">
          <a className="text-blue-600 underline" href="#">
            Forgot Password
          </a>
        </div>

        <button
          type="submit"
          className="w-full mb-3 bg-indigo-500 hover:bg-indigo-600/90 active:scale-95 transition py-2.5 rounded-full text-white"
        >
          Log in
        </button>

        <p className="text-center mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-500 underline">
            Signup Now
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
