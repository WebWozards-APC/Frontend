import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import ProtectedRoute from "./components/ProtectedRoute"; 

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
                <ProtectedRoute>
                  <Blogs />
                </ProtectedRoute>
              }
            />

            <Route
              path="/blogs/:id"
              element={
                <ProtectedRoute>
                  <BlogDetail />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/add-blog"
              element={
                <ProtectedRoute>
                  <AddBlog />
                </ProtectedRoute>
              }
            />

            <Route
              path="/edit-blog/:id"
              element={
                <ProtectedRoute>
                  <EditBlog />
                </ProtectedRoute>
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
