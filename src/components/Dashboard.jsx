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
  const role = Array.isArray(roles) ? roles[0] : null;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        if (!userId || !role) {
          navigate("/login");
          return;
        }
        // ✅ Fetch blogs of the user
        const blogsRes = await axios.get(
          `http://localhost:8080/api/posts/user/${userId}?page=0&size=5`
        );

        if (blogsRes.data && blogsRes.data.content) {
          setBlogs(blogsRes.data.content);
        } else {
          setBlogs([]);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    };
    fetchDashboardData();
  }, [navigate, userId, role]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleCreateBlog = () => {
    navigate("/add-blog");
  };

  // ✅ Navigate to blog detail page
  const handleBlogClick = (id) => {
    navigate(`/blogs/${id}`);
  };

  // ✅ Delete a blog
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/posts/${id}`);
      setBlogs((prev) => prev.filter((blog) => blog.id !== id)); // remove from state
    } catch (err) {
      console.error("Error deleting blog:", err);
      alert("Failed to delete blog.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {/* User Details */}
      <div className="mb-6 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">User Details</h2>
        <p>
          <span className="font-medium">Name:</span> {name || "-"}
        </p>
        <p>
          <span className="font-medium">Email:</span> {email || "-"}
        </p>
        <p>
          <span className="font-medium">Role:</span> {role || "-"}
        </p>
      </div>

      {/* Recent Blogs */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">📝 Your Recent Blogs</h2>
        {blogs.length === 0 ? (
          <p className="text-gray-500">No blogs created yet.</p>
        ) : (
          <ul className="space-y-4">
            {blogs.map((blog) => (
              <li
                key={blog.id}
                className="p-4 bg-white rounded shadow flex justify-between items-start"
              >
                {/* Blog Content (clickable) */}
                <div
                  onClick={() => handleBlogClick(blog.id)}
                  className="cursor-pointer hover:bg-gray-50 p-2 rounded flex-1"
                >
                  <h3 className="text-lg font-bold mb-1">{blog.title}</h3>
                  <p className="text-gray-700 mb-1">
                    {blog.content?.slice(0, 120)}...
                  </p>
                  <p className="text-sm text-gray-500">
                    Created:{" "}
                    {blog.createdAt
                      ? new Date(blog.createdAt).toLocaleDateString()
                      : "Unknown"}
                  </p>
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
                {/* Update Button */}
                <button
                  onClick={() => navigate(`/edit-blog/${blog.id}`)}
                  className="ml-2 bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                >
                  Update
                </button>
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
