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
    setError(""); // clear old error

    try {
      const res = await axios.post("http://localhost:8080/api/users/login", {
        email,
        password,
      });

      if (res.data && res.data.id && res.data.roles) {
        // ✅ Store all required items in localStorage
        localStorage.setItem("userId", res.data.id);
        localStorage.setItem("roles", JSON.stringify(res.data.roles));
        localStorage.setItem("token", "logged-in"); // dummy token for RequireAuth
        if (res.data.email) {
          localStorage.setItem("email", res.data.email);
        }
        if (res.data.name) {
          localStorage.setItem("name", res.data.name);
        }

        // Update navbar in case it's listening
        window.dispatchEvent(new Event("storage"));

        setShouldRedirect(true);
      } else {
        setError(res.data?.message || "Unexpected response from server");
        console.error("Login response:", res.data);
      }
    } catch (err) {
      if (err.response) {
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

  useEffect(() => {
    if (shouldRedirect) {
      navigate(from, { replace: true });
    }
  }, [shouldRedirect, navigate, from]);

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
