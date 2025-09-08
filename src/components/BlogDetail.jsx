import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const res = await fetch(`http://localhost:8080/api/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setBlog(data);
      } catch (err) {
        console.error("Error fetching blog details:", err);
        setError("Failed to load blog details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p className="p-6">Loading blog details...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!blog) return <p className="p-6">No blog found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {blog.imgUrl && (
        <img
          src={blog.imgUrl}
          alt={blog.title}
          className="w-full h-[400px] object-cover rounded-lg mb-6"
        />
      )}
      <h1 className="text-4xl font-bold mb-4">{blog.title}</h1>
      <p className="text-gray-600 text-sm mb-6">
        Posted on{" "}
        {blog.createdAt
          ? new Date(blog.createdAt).toLocaleDateString()
          : "Unknown date"}
      </p>
      <p className="text-lg text-gray-800 leading-relaxed">{blog.content}</p>
    </div>
  );
}

export default BlogDetail;
