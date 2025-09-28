import Image from "next/image";
import { Heart, MessageCircle } from "lucide-react";
import { PostCardProps, LikeMutationData, UnlikeMutationData, LikesQueryResult, CommentsQueryResult } from "@/interfaces";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@apollo/client/react";
import Avatar from "./Avatar";
import { LIKE_POST_MUTATION } from "@/graphql/requests/posts/likePost";
import { UNLIKE_POST_MUTATION } from "@/graphql/requests/posts/unlikePost";
import { GET_LIKES_QUERY } from "@/graphql/requests/get/getLikes";
import { GET_COMMENTS_QUERY } from "@/graphql/requests/get/getPostComments";
import { useCurrentUser } from "@/hooks/useCurrentUser";

const PostCard: React.FC<PostCardProps> = ({ post, onOpenPost }) => {
  const [likedPosts, setLikedPosts] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("likedPosts") || "[]");
    }
    return [];
  });
  const user = useCurrentUser();

  useEffect(() => {
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
  }, [likedPosts]);

  const { data: likesData, loading: likesLoading } = useQuery<LikesQueryResult>(
    GET_LIKES_QUERY,
    {
      variables: { postId: parseInt(post.id, 10) },
      skip: !post.id,
    }
  );

  const { data: commentsData } = useQuery<CommentsQueryResult>(
    GET_COMMENTS_QUERY,
    {
      variables: { postId: parseInt(post.id, 10) },
      skip: !post.id,
    }
  );

  const [likePost, { loading: likeMutationLoading }] = useMutation<LikeMutationData>(
    LIKE_POST_MUTATION,
    {
      refetchQueries: [
        {
          query: GET_LIKES_QUERY,
          variables: { postId: parseInt(post.id, 10) },
        },
      ],
    }
  );

  const [unlikePost, { loading: unlikeMutationLoading }] = useMutation<UnlikeMutationData>(
    UNLIKE_POST_MUTATION,
    {
      refetchQueries: [
        {
          query: GET_LIKES_QUERY,
          variables: { postId: parseInt(post.id, 10) },
        },
      ],
    }
  );

  const isLiked = user
    ? likedPosts.includes(post.id) ||
      likesData?.likes.some((like) => like.user.id === user.username) ||
      false
    : false;

  const handleToggleLike = async (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!user) {
      toast.error("Please log in to like this post.");
      return;
    }
    if (!post.id) {
      toast.error("Invalid post ID.");
      return;
    }

    try {
      if (isLiked) {
        const { data } = await unlikePost({
          variables: { postId: parseInt(post.id, 10) },
        });

        if (!data?.unlikePost?.success) {
          throw new Error("Unlike operation failed");
        }

        setLikedPosts((prev) => prev.filter((id) => id !== post.id));
        toast.success("Post unliked!");
      } else {
        const { data } = await likePost({
          variables: { postId: parseInt(post.id, 10) },
        });

        if (!data?.likePost?.like) {
          throw new Error("No like data returned from server");
        }

        setLikedPosts((prev) => [...prev, post.id]);
        toast.success("Post liked! ❤️");
      }
    } catch (err) {
      console.error("Error processing like/unlike:", err);
    }
  };

  return (
    <div
      onClick={onOpenPost}
      className="bg-white cursor-pointer text-black w-full md:max-w-4xl border-b border-gray-200 p-4"
    >
      <div className="flex items-center gap-2 mb-4">
        <Avatar
          username={post.author.username}
          profilePicture={post.author.profilePicture}
          size="md"
        />
        <span className="font-bold text-amber-900 cursor-pointer hover:underline">
          {post.author.username}
        </span>
        <span className="text-gray-500 text-xs ml-2">
          {new Date(post.createdAt).toLocaleString()}
        </span>
      </div>

      {post.content && <p className="mb-4 text-gray-800">{post.content}</p>}

      {post.imageUrl && (
        <div className="w-full max-h-96 rounded-lg overflow-hidden">
          <Image
            src={post.imageUrl}
            alt={`${post.author.username} image`}
            width={500}
            height={500}
            className="rounded-lg object-cover object-center w-full max-h-96"
            style={{ objectFit: "cover" }}
          />
        </div>
      )}

      <div className="flex items-center gap-4 pt-3">
        <button
          onClick={handleToggleLike}
          className={`flex items-center gap-1 ${
            isLiked ? "text-green-500" : "text-gray-500"
          } ${
            likeMutationLoading || unlikeMutationLoading || likesLoading || !user
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          disabled={likeMutationLoading || unlikeMutationLoading || likesLoading || !user}
        >
          <Heart size={15} fill={isLiked ? "currentColor" : "none"} />
          {likesData?.likes.length || 0} Likes
        </button>

        <button
          onClick={onOpenPost}
          className="flex items-center gap-1 text-gray-500"
        >
          <MessageCircle size={15} />
          {commentsData?.comments.length || 0} Comments
        </button>
      </div>
    </div>
  );
};

export default PostCard;