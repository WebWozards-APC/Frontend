import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const [blogCount, setBlogCount] = useState(0);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const userId = localStorage.getItem("userId"); 
        const userRole = localStorage.getItem("role"); 

        if (!userId || !userRole) {
          navigate("/login");
          return;
        }

        setRole(userRole);

        let url = "";

        if (userRole === "ADMIN") {
          url = "http://localhost:8080/api/dashboard/admin";
        } else {
          url = `http://localhost:8080/api/dashboard/user/${userId}`;
        }

        // no token needed if backend doesn’t check JWT
        const res = await axios.get(url);

        setBlogCount(res.data.totalBlogs);
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

      {role === "ADMIN" ? (
        <p className="text-lg mb-4">✅ Total Blogs in System: {blogCount}</p>
      ) : (
        <p className="text-lg mb-4">✅ Your Blogs Created: {blogCount}</p>
      )}

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
