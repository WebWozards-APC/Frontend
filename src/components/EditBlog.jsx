import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState({ title: "", content: "", imgUrl: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch blog details
    axios
      .get(`http://localhost:8080/api/posts/${id}`)
      .then((res) => {
        setBlog({
          title: res.data.title,
          content: res.data.content,
          imgUrl: res.data.imgUrl || "",
        });
        setLoading(false);
      })
      .catch(() => {
        alert("Failed to load blog.");
        navigate("/dashboard");
      });
  }, [id, navigate]);

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", blog.title);
    formData.append("content", blog.content);
    if (blog.imgUrl) formData.append("imgUrl", blog.imgUrl);

    try {
      await axios.put(`http://localhost:8080/api/posts/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Blog updated!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to update blog.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-xl mx-auto py-10">
      <h2 className="text-2xl font-bold mb-4">Edit Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          value={blog.title}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Title"
          required
        />
        <textarea
          name="content"
          value={blog.content}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Content"
          rows={8}
          required
        />
        <input
          name="imgUrl"
          value={blog.imgUrl}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          placeholder="Image URL"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
}

export default EditBlog;
