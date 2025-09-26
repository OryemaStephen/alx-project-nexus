import { useRouter } from "next/router";
import { useState } from "react";
import { Loader2, ArrowLeft, Heart, Share } from "lucide-react";
import Image from "next/image";
import { PostQueryResult, AddCommentMutationData, LikeMutationData, UnlikeMutationData, ShareMutationData, LikesQueryResult } from "@/interfaces";
import Dashboard from "@/components/layout/Dashboard";
import Button from "@/components/common/Button";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_POST_QUERY } from "@/graphql/requests/get/getPost";
import { GET_COMMENTS_QUERY } from "@/graphql/requests/get/getPostComments";
import { ADD_COMMENT_MUTATION } from "@/graphql/requests/posts/addComment";
import { LIKE_POST_MUTATION } from "@/graphql/requests/posts/likePost";
import { UNLIKE_POST_MUTATION } from "@/graphql/requests/posts/unlikePost";
import { GET_LIKES_QUERY } from "@/graphql/requests/get/getLikes";
import Avatar from "@/components/common/Avatar";
import Comments from "@/components/common/Comments";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { SHARE_POST_MUTATION } from "@/graphql/requests/posts/sharePost";

const PostDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [comment, setComment] = useState("");
  const [shareMessage, setShareMessage] = useState("");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
   const user = useCurrentUser();

  const postId = typeof id === "string" ? parseInt(id, 10) : null;

  const { data: postData, loading: postLoading, error: postError } = useQuery<PostQueryResult>(GET_POST_QUERY, {
    variables: { id: postId },
    skip: !postId,
  });
  const { data: likesData, loading: likesLoading } = useQuery<LikesQueryResult>(GET_LIKES_QUERY, {
    variables: { postId },
    skip: !postId,
  });

  const [addComment, { loading: commentMutationLoading, error: commentMutationError }] = useMutation<AddCommentMutationData>(
    ADD_COMMENT_MUTATION,
    {
      refetchQueries: [
        { query: GET_COMMENTS_QUERY, variables: { postId } },
        { query: GET_POST_QUERY, variables: { id: postId } },
      ],
    }
  );

  const [likePost, { loading: likeMutationLoading, error: likeMutationError }] = useMutation<LikeMutationData>(
    LIKE_POST_MUTATION,
    {
      refetchQueries: [
        { query: GET_POST_QUERY, variables: { id: postId } },
        { query: GET_LIKES_QUERY, variables: { postId } },
      ],
    }
  );

  const [unlikePost, { loading: unlikeMutationLoading, error: unlikeMutationError }] = useMutation<UnlikeMutationData>(
    UNLIKE_POST_MUTATION,
    {
      refetchQueries: [
        { query: GET_POST_QUERY, variables: { id: postId } },
        { query: GET_LIKES_QUERY, variables: { postId } },
      ],
    }
  );

  const [sharePost, { loading: shareMutationLoading, error: shareMutationError }] = useMutation<ShareMutationData>(
    SHARE_POST_MUTATION,
    {
      refetchQueries: [{ query: GET_POST_QUERY, variables: { id: postId } }],
    }
  );

  const post = postData?.post;
  const isLiked = likesData?.likes?.some((like) => like?.user?.username === user?.username) || false;

  const handleAddComment = async () => {
    if (!comment.trim()) {
      toast.error("Comment content is required.");
      return;
    }

    if (!postId) {
      toast.error("Invalid post ID.");
      return;
    }

    try {
      const { data } = await addComment({
        variables: { postId, content: comment.trim() },
      });

      if (!data?.addComment?.comment) {
        throw new Error("No comment data returned from server");
      }

      setComment("");
      toast.success("Comment added successfully! 🎉");
    } catch (err) {
      console.error("Error adding comment:", err);
      toast.error("Failed to add comment. Please try again.");
    }
  };

  const handleToggleLike = async () => {
    if (!postId) {
      toast.error("Invalid post ID.");
      return;
    }

    try {
      if (isLiked) {
        const { data } = await unlikePost({
          variables: { postId },
        });

        if (!data?.unlikePost?.success) {
          throw new Error("Unlike operation failed");
        }

        toast.success("Post unliked!");
      } else {
        const { data } = await likePost({
          variables: { postId },
        });

        if (!data?.likePost?.like) {
          throw new Error("No like data returned from server");
        }

        toast.success("Post liked! ❤️");
      }
    } catch (err) {
      console.error("Error processing like/unlike:", err);
    }
  };

  const handleSharePost = async () => {
    if (!postId) {
      toast.error("Invalid post ID.");
      return;
    }

    try {
      const { data } = await sharePost({
        variables: { postId, message: shareMessage.trim() || undefined },
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

  if (postLoading || likesLoading) {
    return (
      <div className="flex w-full min-h-[70vh] justify-center items-center">
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin" /> Loading post...
        </div>
      </div>
    );
  }

  if (postError || !post) {
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
          <div className="flex items-center gap-2 mb-4">
            <Avatar
              username={post.author.username}
              profilePicture={post.author.profilePicture}
              size="md"
            />
            <span className="font-bold text-amber-900">
              {post.author.username}
            </span>
            <span className="text-gray-500 text-sm ml-2">
              {new Date(post.createdAt).toLocaleString()}
            </span>
          </div>

          {post.content && <p className="mb-4 text-gray-800">{post.content}</p>}

          {post.imageUrl && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="w-full h-auto rounded-lg overflow-hidden">
                <Image
                  src={post.imageUrl}
                  alt="Post image"
                  width={400}
                  height={400}
                  className="rounded-lg w-full max-h-80"
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-5 text-gray-600 text-sm mb-4">
            <Button
              title={
                likeMutationLoading || unlikeMutationLoading
                  ? "Processing..."
                  : isLiked
                  ? `Unlike (${post.likeCount})`
                  : `Like (${post.likeCount})`
              }
              type="button"
              action={handleToggleLike}
              disabled={likeMutationLoading || unlikeMutationLoading}
              className="flex items-center gap-1 rounded-md hover:bg-[#9dcce3] transition px-2 py-1"
              icon={<Heart
                size={16}
                className={isLiked ? "text-red-500 fill-red-500" : "text-red-500"}
              />}
            />
            <span>{post.commentCount} Comments</span>
            <Button
              title={shareMutationLoading ? "Sharing..." : `Share (${post.shareCount})`}
              type="button"
              action={() => setIsShareModalOpen(true)}
              disabled={shareMutationLoading}
              className="flex items-center gap-1 rounded-md hover:bg-[#9dcce3] transition px-2 py-1"
              icon={ <Share size={16} className="text-blue-500" />}
            />
          </div>

          {(likeMutationError || unlikeMutationError || shareMutationError || commentMutationError) && (
            <div className="text-red-500 mb-4">
              Error: {(likeMutationError || unlikeMutationError || shareMutationError || commentMutationError)?.message || "An error occurred while processing the action."}
            </div>
          )}
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
                <Button
                  title="Cancel"
                  type="button"
                  action={() => {
                    setShareMessage("");
                    setIsShareModalOpen(false);
                  }}
                  className="rounded-md bg-gray-200 hover:bg-gray-300 transition"
                />
                <Button
                  title={shareMutationLoading ? "Sharing..." : "Share"}
                  type="button"
                  action={handleSharePost}
                  disabled={shareMutationLoading}
                  className="rounded-md hover:bg-[#9dcce3] transition"
                />
              </div>
            </div>
          </div>
        )}

        <div className="bg-white p-4 rounded-b-2xl shadow-lg">
          <h2 className="text-xl text-black font-semibold mb-4">Comments</h2>

          <div className="mb-4">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A9DEF9]"
              rows={2}
            />
            <Button
              title={commentMutationLoading ? "Posting..." : "Post Comment"}
              type="button"
              action={handleAddComment}
              disabled={commentMutationLoading}
              className="rounded-md hover:bg-[#9dcce3] transition"
            />
          </div>

          {postId && <Comments postId={postId} />}
        </div>
      </div>
    </Dashboard>
  );
};

export default PostDetailPage;