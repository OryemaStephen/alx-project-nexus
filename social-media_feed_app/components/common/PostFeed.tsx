import { useRouter } from "next/router";
import { Loader2 } from "lucide-react";
import { Post, PostsQueryResults } from "@/interfaces";
import PostCard from "./PostCard";
import { useQuery } from "@apollo/client/react";
import { GET_POSTS_QUERY } from "@/graphql/requests/get/getPosts";

const PostFeed: React.FC = () => {
  const router = useRouter();
  const { data, loading, error } = useQuery<PostsQueryResults>(GET_POSTS_QUERY);

  if (error) {
    console.error(error || "Failed to fetch posts. Please try again.");
    return (
      <div className="flex w-full min-h-[70vh] justify-center items-center">
        <p className="text-red-500">Failed to fetch posts. Please try again.</p>
      </div>
    );
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
      {!loading && !error && (!data?.posts || data.posts.length === 0) && (
        <p className="text-center text-gray-400">No posts available.</p>
      )}
      {!loading && !error && data?.posts && (
        <div>
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