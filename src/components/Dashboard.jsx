import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  // Get user details from localStorage
  const userId = localStorage.getItem("userId");
  const email = localStorage.getItem("email");
  const name = localStorage.getItem("name");
  const roles = JSON.parse(localStorage.getItem("roles"));
  const isAdmin = Array.isArray(roles) && roles.includes("ROLE_ADMIN");
  const roleLabel = isAdmin ? "Admin" : "User";

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (!userId || !roleLabel) {
          navigate("/login");
          return;
        }
        let blogsRes;
        if (isAdmin) {
          // Admin: fetch all posts
          blogsRes = await axios.get(
            `http://localhost:8080/api/posts?page=0&size=100`,
            {
              headers: {
                Authorization: localStorage.getItem("auth")
                  ? `Basic ${localStorage.getItem("auth")}`
                  : undefined,
              },
              withCredentials: true,
            }
          );
          setBlogs(blogsRes.data.content || []);
        } else {
          // User: fetch only their posts
          blogsRes = await axios.get(
            `http://localhost:8080/api/posts/user/${userId}?page=0&size=5`,
            {
              headers: {
                Authorization: localStorage.getItem("auth")
                  ? `Basic ${localStorage.getItem("auth")}`
                  : undefined,
              },
              withCredentials: true,
            }
          );
          setBlogs(blogsRes.data.content || []);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setBlogs([]);
      }
    };
    fetchDashboardData();
  }, [navigate, userId, roleLabel, isAdmin]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleCreateBlog = () => {
    navigate("/add-blog");
  };

  const handleBlogClick = (id) => {
    navigate(`/blogs/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/posts/${id}`, {
        headers: {
          Authorization: localStorage.getItem("auth")
            ? `Basic ${localStorage.getItem("auth")}`
            : undefined,
        },
        withCredentials: true,
      });
      setBlogs((prev) => prev.filter((blog) => blog.id !== id));
    } catch (err) {
      console.error("Error deleting blog:", err);
      alert("Failed to delete blog.");
    }
  };

  // Generate initials for profile pic
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto py-8 px-6">
        {/* User Profile Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex items-center justify-between">
            {/* Profile Info */}
            <div className="flex items-center space-x-4">
              {/* Profile Picture */}
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {getInitials(name)}
              </div>

              {/* User Details */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {name || "User"}
                </h2>
                <p className="text-gray-600">{email || "No email"}</p>
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium mt-1">
                  {roleLabel || "No role"}
                </span>
              </div>
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>

        {/* My Blogs Section - Always Visible */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          {/* Header Section */}
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-lg">📝</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {isAdmin ? "All Blogs" : "My Blogs"}
              </h3>
              <p className="text-gray-600 text-sm">
                {isAdmin
                  ? "View and manage all blog posts"
                  : "View and manage your blog posts"}
              </p>
            </div>
            <button
              onClick={handleCreateBlog}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              + Create Blog
            </button>
          </div>

          {/* Blogs Content - Always Shown */}
          {blogs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">
                {isAdmin
                  ? "No blogs found in the app."
                  : "No blogs created yet."}
              </p>
              <button
                onClick={handleCreateBlog}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
              >
                Create Your First Blog
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="p-4 bg-gray-50 rounded-lg border hover:border-gray-300 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    {/* Blog Content */}
                    <div
                      onClick={() => handleBlogClick(blog.id)}
                      className="cursor-pointer flex-1 mr-4"
                    >
                      <h4 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                        {blog.title}
                      </h4>
                      <p className="text-gray-700 text-sm mb-2">
                        {blog.content?.slice(0, 120)}...
                      </p>
                      <p className="text-xs text-gray-500">
                        Created:{" "}
                        {blog.createdAt
                          ? new Date(blog.createdAt).toLocaleDateString()
                          : "Unknown"}
                      </p>
                      {isAdmin && blog.userName && (
                        <p className="text-xs text-gray-500">
                          Author: {blog.userName}
                        </p>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-2">
                      {!isAdmin && (
                        <button
                          onClick={() => navigate(`/edit-blog/${blog.id}`)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(blog.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
