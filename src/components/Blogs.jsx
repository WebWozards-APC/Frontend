import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8080/api/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBlogs(res.data.content || []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">Latest Blogs</h2>
      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white p-4 shadow-md rounded-lg cursor-pointer hover:shadow-lg transition"
              onClick={() => navigate(`/blogs/${blog.id}`)}
            >
              <img
                src={blog.imgUrl}
                alt={blog.title}
                className="w-full h-80 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{blog.title}</h3>
              <p className="text-gray-700 line-clamp-3">{blog.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                Posted on {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Blogs;
