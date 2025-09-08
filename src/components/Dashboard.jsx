import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const [blogCount, setBlogCount] = useState(0);
  const [role, setRole] = useState(null);
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const roles = JSON.parse(localStorage.getItem("roles"));
        const userRole = Array.isArray(roles) ? roles[0] : null;

        if (!userId || !userRole) {
          navigate("/login");
          return;
        }

        setRole(userRole);

        // Fetch user details
        const userRes = await axios.get(
          `http://localhost:8080/api/users/${userId}`
        );
        setUser(userRes.data);

        // Fetch blogs for user
        const blogsRes = await axios.get(
          `http://localhost:8080/api/posts/user/${userId}`
        );
        setBlogs(Array.isArray(blogsRes.data) ? blogsRes.data : []);
        setBlogCount(Array.isArray(blogsRes.data) ? blogsRes.data.length : 0);
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };
    fetchDashboardData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear(); // remove everything
    navigate("/login");
  };

  const handleCreateBlog = () => {
    navigate("/add-blog");
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* User Details */}
      {user && (
        <div className="mb-6 p-4 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">User Details</h2>
          <p>
            <span className="font-medium">Name:</span> {user.name}
          </p>
          <p>
            <span className="font-medium">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-medium">Role:</span> {role}
          </p>
        </div>
      )}

      <p className="text-lg mb-4">✅ Your Blogs Created: {blogCount}</p>

      {/* Blog List */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Your Blogs</h2>
        {blogs.length === 0 ? (
          <p className="text-gray-500">No blogs found.</p>
        ) : (
          <ul className="space-y-4">
            {blogs.map((blog) => (
              <li key={blog.id} className="p-4 bg-white rounded shadow">
                <h3 className="text-lg font-bold mb-1">{blog.title}</h3>
                <p className="text-gray-700 mb-1">
                  {blog.content?.slice(0, 100)}...
                </p>
                <p className="text-sm text-gray-500">
                  Created:{" "}
                  {blog.createdAt
                    ? new Date(blog.createdAt).toLocaleDateString()
                    : "Unknown"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleCreateBlog}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Create Blog
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
