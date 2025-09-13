import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./components/Landing";
import Login from "./components/Login";
import Blogs from "./components/Blogs";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import BlogDetail from "./components/BlogDetail";
import AddBlog from "./components/AddBlog";
import EditBlog from "./components/EditBlog";


function RequireAuth({ children }) {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const [checking, setChecking] = useState(true);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    if (!token) {
      setChecking(false);
      setValid(false);
      return;
    }
    fetch("http://localhost:8080/api/users/me", {
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401) {
          localStorage.clear();
          setValid(false);
        } else {
          setValid(true);
        }
        setChecking(false);
      })
      .catch(() => {
        localStorage.clear();
        setValid(false);
        setChecking(false);
      });
  }, [token]);

  if (checking) return null;

  if (!valid) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}
            <Route
              path="/blogs"
              element={
                <RequireAuth>
                  <Blogs />
                </RequireAuth>
              }
            />

            <Route
              path="/blogs/:id"
              element={
                <RequireAuth>
                  <BlogDetail />
                </RequireAuth>
              }
            />

            <Route
              path="/dashboard"
              element={
                <RequireAuth>
                  <Dashboard />
                </RequireAuth>
              }
            />

            <Route
              path="/add-blog"
              element={
                <RequireAuth>
                  <AddBlog />
                </RequireAuth>
              }
            />

            <Route
              path="/edit-blog/:id"
              element={
                <RequireAuth>
                  <EditBlog />
                </RequireAuth>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
