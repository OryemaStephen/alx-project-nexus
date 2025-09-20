import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Loader2, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Post } from "@/interfaces";
import Dashboard from "@/components/layout/Dashboard";
import Button from "@/components/common/Button";
import { toast } from "react-toastify";
import { mockData } from "@/constants";

const fetchPost = async (id: string): Promise<Post | null> => {
  return mockData.posts.find((post) => post.id === id) || null;
};

const PostDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (id) {
      const loadPost = async () => {
        setLoading(true);
        const postData = await fetchPost(id as string);
        setPost(postData);
        setLoading(false);
      };

      loadPost();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex w-full min-h-[70vh] justify-center items-center">
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin" /> Loading post...
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <h1 className="text-2xl font-bold">Post not found</h1>
        <button
          onClick={() => router.back()}
          className="mt-4 text-blue-500 hover:underline"
        >
          Go back
        </button>
      </div>
    );
  }

  return (
    <Dashboard>
      <div className="w-full">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-800"
        >
          <ArrowLeft size={20} /> Back
        </button>

        <div className="bg-white rounded-t-2xl shadow-lg p-4">
          <div className="flex items-center mb-4">
            <span className="font-bold text-amber-900">
              {post.author.username}
            </span>
            <span className="text-gray-500 text-sm ml-2">
              {new Date(post.createdAt).toLocaleString()}
            </span>
          </div>

          {post.content && <p className="mb-4 text-gray-800">{post.content}</p>}

          {post.imageUrls && post.imageUrls.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {post.imageUrls.map((url, index) => (
                <div
                  key={index}
                  className="w-full h-auto rounded-lg overflow-hidden"
                >
                  <Image
                    src={url}
                    alt={`Post image ${index + 1}`}
                    width={400}
                    height={300}
                    className="rounded-lg w-full max-h-72"
                    style={{ objectFit: "cover" }}
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-5 text-gray-600 text-sm">
            <span>{post.likeCount} Likes</span>
            <span>{post.commentCount} Comments</span>
            <span>{post.shareCount} Shares</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-b-2xl shadow-lg">
          <h2 className="text-xl text-black font-semibold mb-4">Comments</h2>

          <div className="mb-4">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A9DEF9]"
              rows={3}
            />
            <Button
              title={loading ? "Posting..." : "Post Comment"}
              type="button"
              action={() => toast.success("Comment feature coming soon!")}
              className="rounded-md hover:bg-[#9dcce3] transition"
            />
          </div>

          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center mb-2">
                <span className="font-semibold text-black">jane_doe</span>
                <span className="text-gray-500 text-sm ml-2">2 hours ago</span>
              </div>
              <p className="text-gray-700">
                This is a sample comment on the post.
              </p>
            </div>
            <div className="border-b border-gray-200 pb-4">
              <div className="flex items-center mb-2">
                <span className="font-semibold text-black">pitt_02</span>
                <span className="text-gray-500 text-sm ml-2">2 hours ago</span>
              </div>
              <p className="text-gray-700">
                This is a sample comment on the post.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default PostDetailPage;
