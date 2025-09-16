import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [likeCount, setLikeCount] = useState(0);
  const [liked, setLiked] = useState(false);

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  const userId = localStorage.getItem("userId");
  const userName = localStorage.getItem("name");

  // Fetch blog and comments
  useEffect(() => {
    fetchBlog();
    fetchComments();
    // eslint-disable-next-line
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8080/api/posts/${id}`);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = await res.json();
      setBlog(data);
      setLikeCount(data.likeCount || 0);

      // If backend returns likedUsers, set liked state
      if (userId && data.likedUsers && Array.isArray(data.likedUsers)) {
        setLiked(data.likedUsers.includes(Number(userId)));
      } else {
        setLiked(false);
      }
    } catch (err) {
      setError("Failed to load blog details. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      setCommentLoading(true);
      const res = await fetch(
        `http://localhost:8080/api/posts/${id}/comments?page=0&size=10`
      );
      if (!res.ok) throw new Error("Failed to fetch comments");
      const data = await res.json();
      setComments(data.content || []);
    } catch (err) {
      // Optionally handle error
    } finally {
      setCommentLoading(false);
    }
  };

  // Like/unlike handler
  const handleLike = async () => {
    if (!userId) {
      alert("You must be logged in to like a post.");
      return;
    }
    try {
      const res = await fetch(
        `http://localhost:8080/api/posts/${id}/likes?userId=${userId}`,
        { method: liked ? "DELETE" : "POST" }
      );
      if (!res.ok) throw new Error("Failed to like/unlike");

      // Wait for backend to update, then refetch blog details for accurate like count and liked state
      await fetchBlog();
    } catch (err) {
      alert("Failed to update like.");
    }
  };

  // Add comment handler
  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!userId) {
      alert("You must be logged in to comment.");
      return;
    }
    if (!newComment.trim()) return;
    try {
      const res = await fetch(
        `http://localhost:8080/api/posts/${id}/comments?userId=${userId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: newComment }),
        }
      );
      if (!res.ok) throw new Error("Failed to add comment");
      setNewComment("");
      fetchComments();
    } catch (err) {
      alert("Failed to add comment.");
    }
  };

  // Fetch user details (e.g., to get userName)
  // useEffect(() => {
  //   const fetchUserDetails = async () => {
  //     try {
  //       const res = await fetch("http://localhost:8080/api/users/me", {
  //         headers: {
  //           Authorization: `Basic ${localStorage.getItem("auth")}`,
  //         },
  //         credentials: "include",
  //       });
  //       if (!res.ok) throw new Error("Failed to fetch user details");
  //       const data = awFait res.json();
  //       // Optionally, do something with user details
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   fetchUserDetails();
  // }, []);

  if (loading) return <p className="p-6">Loading blog details...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!blog) return <p className="p-6">No blog found.</p>;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <div className="w-full">
        {blog.imgUrl && (
          <img
            src={blog.imgUrl}
            alt={blog.title}
            className="w-full h-72 md:h-120 object-cover"
          />
        )}
      </div>

      <div className="max-w-3xl mx-auto px-5 py-10">
        {/* <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 mb-6">
          <span>
            Written by <strong>{blog.userName || "Anonymous"}</strong>
          </span>
          <span>
            {blog.createdAt
              ? new Date(blog.createdAt).toDateString()
              : "Unknown date"}
          </span>
        </div> */}

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-6 leading-snug"
        >
          {blog.title}
        </motion.h1>

        {blog.content.split("\n").map((para, idx) => (
          <motion.p
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="mb-5 leading-relaxed text-gray-700"
          >
            {para}
          </motion.p>
        ))}

        {/* Heart Like Section
        <div className="flex items-center gap-3 mt-6">
          <button
            type="button"
            onClick={handleLike}
            disabled={liked}
            aria-label={liked ? "Unlike" : "Like"}
            className="focus:outline-none"
            style={{ background: "none", border: "none", padding: 0 }}
            title={liked ? "You already liked this post" : "Like this post"}
          >
            <Heart
              className={`w-8 h-8 cursor-pointer transition-colors ${
                liked ? "fill-red-500 text-red-500" : "text-gray-500"
              }`}
              fill={liked ? "#ef4444" : "none"}
            />
          </button>
          <span className="font-bold text-lg">{likeCount}</span>
          <span className="text-gray-600">
            {likeCount === 1 ? "like" : "likes"}
          </span>
        </div> */}

        {/* Comments Section */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4">Comments</h2>
          <div className="space-y-4">
            {comments.map((c) => (
              <div key={c.id} className="border-b pb-3">
                <p className="text-sm font-semibold">
                  {String(c.userId) === String(userId)
                    ? userName || "You"
                    : c.userName || "User"}
                </p>
                <p className="text-gray-600">{c.content}</p>
                <span className="text-xs text-gray-500">
                  {c.createdAt
                    ? new Date(c.createdAt).toLocaleString()
                    : "Just now"}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={handleAddComment} className="mt-6">
            <textarea
              rows="3"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-sky-500 outline-none resize-none"
            />
            <button
              type="submit"
              className="mt-3 bg-sky-600 text-white px-5 py-2 rounded-lg hover:bg-sky-700 transition"
              disabled={commentLoading}
            >
              Post Comment
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;
