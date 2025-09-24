import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { Post } from "@/interfaces";
import PostCard from "./PostCard";
import { mockData } from "@/constants";

const fetchUserPosts = async (userId: string): Promise<Post[]> => {
  return mockData.posts.filter((post) => post.author.id === userId);
};

const UserPosts: React.FC = () => {
  const router = useRouter();
  const userId = "user2";
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (userId) {
      const loadUserPosts = async () => {
        try {
          setLoading(true);
          const userPosts = await fetchUserPosts(userId as string);
          setPosts(userPosts);
        } catch (err) {
          setError(`Failed to fetch user posts. Please try again.${err}`);
        } finally {
          setLoading(false);
        }
      };

      loadUserPosts();
    }
  }, [userId]);

  if (error) {
    console.error(error);
    return (
      <div className="flex w-full min-h-[70vh] justify-center items-center">
        <p className="text-center text-red-500">{error}</p>
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
      {!loading && !error && posts.length === 0 && (
        <p className="text-center text-gray-400">No posts available for this user.</p>
      )}
      {!loading && !error && posts.length > 0 && (
        <div>
          {posts.map((post: Post) => (
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

export default UserPosts;