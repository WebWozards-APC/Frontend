import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/blogs";

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // clear old error

    try {
      const res = await axios.post("http://localhost:8080/api/users/login", {
        email,
        password,
      });

      // Accept login if backend returns id and roles (no token logic)
      if (res.data && res.data.id && res.data.roles) {
        // Optionally store user info if needed
        localStorage.setItem("userId", res.data.id);
        localStorage.setItem("roles", JSON.stringify(res.data.roles));
        localStorage.setItem("token", "logged-in"); // Set dummy token for RequireAuth
        navigate("/blogs", { replace: true });
      } else {
        setError(
          res.data && res.data.message
            ? res.data.message
            : "Unexpected response from server"
        );
        console.error("Login response:", res.data);
      }
    } catch (err) {
      if (err.response) {
        // Show backend error message if present
        setError(
          err.response.data?.message ||
            (err.response.status === 401
              ? "Invalid email or password"
              : `Error: ${err.response.status}`)
        );
        console.error("Login error response:", err.response.data);
      } else {
        setError("Something went wrong. Please try again.");
        console.error("Login error:", err);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-[80vh]">
      <form
        onSubmit={handleLogin}
        className="bg-white p-6 rounded-lg shadow-md w-80"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
