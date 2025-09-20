import { useRouter } from "next/router";
import { Loader2 } from "lucide-react";
import { Post } from "@/interfaces";
import PostCard from "./PostCard";
import { mockData } from "@/constants";



const PostFeed: React.FC = () => {
  const data = mockData;
  const loading = false;
  const error = undefined;
  const router = useRouter();

  if (error) {
    console.error(error || "Failed to fetch posts. Please try again.");
  }

  if (loading) {
    return (
      <div className="flex w-full min-h-[70vh] justify-center items-center">
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin" /> Loading posts...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full mt-4">
      {!loading && !error && data?.posts?.length === 0 && (
        <p className="text-center text-gray-400">No posts available.</p>
      )}
      {!loading && !error && data?.posts && (
        <div className="space-y-4">
          {data.posts.map((post: Post) => (
            <PostCard 
              key={post.id} 
              post={post} 
              onOpenPost={() => router.push(`/dashboard/posts/${post.id}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PostFeed;