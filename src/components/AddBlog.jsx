import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); // ✅ new state
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // ✅ prevent duplicate submissions
    setLoading(true);

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        alert("User not logged in. Please log in first.");
        navigate("/login");
        return;
      }

      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("title", title);
      formData.append("content", content);
      if (image) formData.append("image", image);

      await axios.post("http://localhost:8080/api/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/dashboard");
    } catch (err) {
      console.error("Error creating blog:", err);
      alert("Failed to create blog. Please try again.");
    } finally {
      setLoading(false); // ✅ re-enable button
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center text-sm text-slate-800 pt-20 pb-30"
    >
      <p className="text-xs bg-indigo-200 text-indigo-600 font-medium px-3 py-1 rounded-full">
        Add Blog
      </p>
      <h1 className="text-4xl font-bold py-4 text-center">Create a New Blog</h1>
      <p className="max-md:text-sm text-gray-500 pb-10 text-center">
        Share your thoughts with the world ✍️
      </p>

      <div className="max-w-96 w-full px-4">
        {/* Blog Title */}
        <label htmlFor="title" className="font-medium">
          Blog Title
        </label>
        <div className="flex items-center mt-2 mb-4 h-10 pl-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="h-full px-2 w-full outline-none bg-transparent"
            placeholder="Enter blog title"
            required
          />
        </div>

        {/* Blog Content */}
        <label htmlFor="content" className="font-medium mt-4">
          Blog Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="5"
          className="w-full mt-2 p-2 bg-transparent border border-slate-300 rounded-lg resize-none outline-none focus:ring-2 focus-within:ring-indigo-400 transition-all"
          placeholder="Write your blog content..."
          required
        ></textarea>

        {/* Blog Image */}
        <label htmlFor="image" className="font-medium mt-4">
          Upload Image
        </label>
        <div className="flex items-center mt-2 mb-4 h-10 px-3 border border-slate-300 rounded-full focus-within:ring-2 focus-within:ring-indigo-400 transition-all overflow-hidden">
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading} // ✅ disable while submitting
          className={`flex items-center justify-center gap-1 mt-5 text-white py-2.5 w-full rounded-full transition ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-500 hover:bg-indigo-600"
          }`}
        >
          {loading ? "Submitting..." : "Submit Blog"}
          {!loading && (
            <svg
              className="mt-0.5"
              width="21"
              height="20"
              viewBox="0 0 21 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="m18.038 10.663-5.625 5.625a.94.94 0 0 1-1.328-1.328l4.024-4.023H3.625a.938.938 0 0 1 0-1.875h11.484l-4.022-4.025a.94.94 0 0 1 1.328-1.328l5.625 5.625a.935.935 0 0 1-.002 1.33"
                fill="#fff"
              />
            </svg>
          )}
        </button>
      </div>
    </form>
  );
}

export default AddBlog;
