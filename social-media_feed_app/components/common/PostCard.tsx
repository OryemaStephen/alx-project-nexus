import Image from "next/image";
import { Heart, MessageCircle, Share } from "lucide-react";
import { PostCardProps, LikeMutationData, ShareMutationData, LikesQueryResult } from "@/interfaces";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@apollo/client/react";
import Avatar from "./Avatar";
import { LIKE_POST_MUTATION } from "@/graphql/requests/posts/likePost";
import { GET_LIKES_QUERY } from "@/graphql/requests/get/getLikes";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { SHARE_POST_MUTATION } from "@/graphql/requests/posts/sharePost";

const PostCard: React.FC<PostCardProps> = ({ post, onOpenPost }) => {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const [likedPosts, setLikedPosts] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("likedPosts") || "[]");
    }
    return [];
  });
  const user = useCurrentUser();

  // Sync likedPosts with localStorage
  useEffect(() => {
    localStorage.setItem("likedPosts", JSON.stringify(likedPosts));
  }, [likedPosts]);

  // Fetch the likes for the post
  const { data: likesData, loading: likesLoading } = useQuery<LikesQueryResult>(GET_LIKES_QUERY, {
    variables: { postId: parseInt(post.id, 10) },
    skip: !post.id,
  });

  // Set up mutations
  const [likePost, { loading: likeMutationLoading }] = useMutation<LikeMutationData>(
    LIKE_POST_MUTATION,
    {
      refetchQueries: [{ query: GET_LIKES_QUERY, variables: { postId: parseInt(post.id, 10) } }],
    }
  );

  const [sharePost, { loading: shareMutationLoading }] = useMutation<ShareMutationData>(
    SHARE_POST_MUTATION,
    {
      refetchQueries: [],
    }
  );

  const isLiked = user ? likedPosts.includes(post.id) || likesData?.likes.some((like) => like.user.id === user.username) || false : false;
  const likeCount = isLiked && !likesData?.likes.some((like) => like.user.username === user.username) ? post.likeCount + 1 : post.likeCount;

  const handleToggleLike = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!user) {
      toast.error("Please log in to like this post.");
      return;
    }
    if (!post.id) {
      toast.error("Invalid post ID.");
      return;
    }

    // Update client-side state immediately
    setLikedPosts((prev) => {
      if (prev.includes(post.id)) {
        return prev.filter((id) => id !== post.id);
      }
      return [...prev, post.id];
    });

    // Fire-and-forget like mutation
    likePost({
      variables: { postId: parseInt(post.id, 10) },
    }).catch((err) => {
      console.error("Error liking post:", err);
      toast.error(err.message.includes("already liked") ? "You have already liked this post." : "Failed to like post.");
    });

    toast.success(isLiked ? "Post unliked!" : "Post liked! ❤️");
  };

  // Handle share submission
  const handleSharePost = async (event: React.MouseEvent) => {
    event.stopPropagation();
    if (!user) {
      toast.error("Please log in to share this post.");
      return;
    }
    if (!post.id) {
      toast.error("Invalid post ID.");
      return;
    }

    try {
      const { data } = await sharePost({
        variables: { postId: parseInt(post.id, 10), message: shareMessage.trim() || undefined },
      });

      if (!data?.sharePost?.share) {
        throw new Error("No share data returned from server");
      }

      setShareMessage("");
      setIsShareModalOpen(false);
      toast.success("Post shared successfully! 🚀");
    } catch (err) {
      console.error("Error sharing post:", err);
      toast.error("Failed to share post. Please try again.");
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

      {post.image && (
        <div className="w-full h-auto rounded-lg overflow-hidden">
          <Image
            src={post.image}
            alt={`${post.author.username} image`}
            width={400}
            height={300}
            className="rounded-lg w-full max-h-72"
            style={{ objectFit: "cover" }}
          />
        </div>
      )}

      <div className="flex items-center gap-4 pt-3">
        <button
          onClick={handleToggleLike}
          className={`flex items-center gap-1 ${
            isLiked ? "text-red-500" : "text-gray-500"
          } ${likeMutationLoading || likesLoading || !user ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={likeMutationLoading || likesLoading || !user || isLiked}
        >
          {likeCount} <Heart size={15} fill={isLiked ? "currentColor" : "none"} />
           {/* {isLiked ? "Unlike" : "Like"} */}
        </button>

        <button
          onClick={onOpenPost}
          className="flex items-center gap-1 text-gray-500"
        >
          {post.commentCount} <MessageCircle size={15} />
          {/* {post.commentCount > 1 ? "Comments" : "Comment"} */}
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsShareModalOpen(true);
          }}
          className={`flex items-center gap-1 text-gray-500 ${shareMutationLoading || !user ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={shareMutationLoading || !user}
        >
          {post.shareCount} <Share size={15} />
          {/* Share */}
        </button>
      </div>

      {isShareModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Share Post</h3>
            <textarea
              value={shareMessage}
              onChange={(e) => setShareMessage(e.target.value)}
              placeholder="Add a message (optional)"
              className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A9DEF9] mb-4"
              rows={4}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShareMessage("");
                  setIsShareModalOpen(false);
                }}
                className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSharePost}
                disabled={shareMutationLoading || !user}
                className={`px-4 py-2 bg-[#A9DEF9] rounded-md hover:bg-[#9dcce3] transition ${shareMutationLoading || !user ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                {shareMutationLoading ? "Sharing..." : "Share"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostCard;