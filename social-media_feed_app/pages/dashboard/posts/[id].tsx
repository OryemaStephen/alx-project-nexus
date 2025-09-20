import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Loader2, ArrowLeft } from "lucide-react";
import Image from "next/image";
import { Post } from "@/interfaces";
import Dashboard from "@/components/layout/Dashboard";
import Button from "@/components/common/Button";
import { toast } from "react-toastify";

const fetchPost = async (id: string): Promise<Post | null> => {
  const mockPosts: Post[] = [
    {
      id: "1",
      author: { id: "user1", username: "john_doe" },
      createdAt: "2025-09-18T10:00:00Z",
      imageUrl: undefined,
      likeCount: 42,
      commentCount: 15,
      shareCount: 7,
      content: "This is a sample post content.  Hello world! #firstpost", 
    },
    {
      id: "2",
      author: { id: "user2", username: "jane_smith" },
      createdAt: "2025-09-17T15:30:00Z",
      imageUrl: "https://images.unsplash.com/photo-1640920789307-1df7543f5828?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9uZXklMjB0cmFja2luZ3xlbnwwfHwwfHx8MA%3D%3D",
      likeCount: 23,
      commentCount: 8,
      shareCount: 3,
      content: ""
    },
    {
      id: "3",
      author: { id: "user3", username: "alice_wonder" },
      createdAt: "2025-09-16T08:20:00Z",
      imageUrl: "https://images.unsplash.com/photo-1640920789307-1df7543f5828?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9uZXklMjB0cmFja2luZ3xlbnwwfHwwfHx8MA%3D%3D",
      likeCount: 67,
      commentCount: 25,
      shareCount: 12,
      content: "Testing the post feed component with some sample data!"
    },
  ];
  
  return mockPosts.find(post => post.id === id) || null;
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
    <div className="w-fullp-4">
      <button 
        onClick={() => router.back()}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-800"
      >
        <ArrowLeft size={20} /> Back
      </button>
      
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
        <div className="flex items-center mb-4">
          <span className="font-bold text-amber-900">
            {post.author.username}
          </span>
          <span className="text-gray-500 text-sm ml-2">
            {new Date(post.createdAt).toLocaleString()}
          </span>
        </div>
        
        {post.content && (
          <p className="mb-4 text-gray-800">{post.content}</p>
        )}
        
        {post.imageUrl && (
          <div className="w-full h-auto rounded-lg mb-4 overflow-hidden">
            <Image
              src={post.imageUrl}
              alt="Post image"
              width={600}
              height={400}
              className="rounded-lg"
              style={{ objectFit: "cover" }}
            />
          </div>
        )}
        
        <div className="flex justify-between text-gray-600 text-sm mb-3">
          <span>{post.likeCount} Likes</span>
          <span>{post.commentCount} Comments</span>
          <span>{post.shareCount} Shares</span>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className="text-xl text-black font-semibold mb-4">Comments</h2>
        
        <div className="mb-4">
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A9DEF9] "
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
            <p className="text-gray-700">This is a sample comment on the post.</p>
          </div>
          <div className="border-b border-gray-200 pb-4">
            <div className="flex items-center mb-2">
              <span className="font-semibold text-black">pitt_02</span>
              <span className="text-gray-500 text-sm ml-2">2 hours ago</span>
            </div>
            <p className="text-gray-700">This is a sample comment on the post.</p>
          </div>
        </div>
      </div>
    </div>
    </Dashboard>
  );
};

export default PostDetailPage;