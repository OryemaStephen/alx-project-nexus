import { useRouter } from "next/router";
import { useState } from "react";
import { Loader2, ArrowLeft, Heart } from "lucide-react";
import Image from "next/image";
import { PostQueryResult, AddCommentMutationData, LikeMutationData } from "@/interfaces";
import Dashboard from "@/components/layout/Dashboard";
import Button from "@/components/common/Button";
import { toast } from "react-toastify";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_POST_QUERY } from "@/graphql/requests/get/getPost";
import { GET_COMMENTS_QUERY } from "@/graphql/requests/get/getPostComments";
import { ADD_COMMENT_MUTATION } from "@/graphql/requests/posts/addComment";
import { LIKE_POST_MUTATION } from "@/graphql/requests/posts/likePost";
import Avatar from "@/components/common/Avatar";
import Comments from "@/components/common/Comments";

const PostDetailPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [comment, setComment] = useState("");

  const postId = typeof id === "string" ? parseInt(id, 10) : null;

  const { data, loading, error } = useQuery<PostQueryResult>(GET_POST_QUERY, {
    variables: { id: postId },
    skip: !postId,
  });

  const [addComment, { loading: commentMutationLoading }] = useMutation<AddCommentMutationData>(
    ADD_COMMENT_MUTATION,
    {
      refetchQueries: [
        { query: GET_COMMENTS_QUERY, variables: { postId } },
        { query: GET_POST_QUERY, variables: { id: postId } },
      ],
    }
  );

  const [likePost, { loading: likeMutationLoading }] = useMutation<LikeMutationData>(
    LIKE_POST_MUTATION,
    {
      refetchQueries: [
        { query: GET_POST_QUERY, variables: { id: postId } }
      ],
    }
  );

  const post = data?.post;

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

  // Handle like submission
  const handleLikePost = async () => {
    if (!postId) {
      toast.error("Invalid post ID.");
      return;
    }

    try {
      const { data } = await likePost({
        variables: { postId },
      });

      if (!data?.likePost?.like) {
        throw new Error("No like data returned from server");
      }

      toast.success("Post liked! ❤️");
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };


  if (loading) {
    return (
      <div className="flex w-full min-h-[70vh] justify-center items-center">
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin" /> Loading post...
        </div>
      </div>
    );
  }

  if (error || !post) {
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
                likeMutationLoading
                  ? "Processing..."
                  : `Like (${post.likeCount})`
              }
              type="button"
              icon={<Heart
                size={16}
                className="text-green-500"
              />}
              action={handleLikePost}
              disabled={likeMutationLoading}
              className="flex items-center gap-1 rounded-md bg-transparent hover:bg-transparent hover:border-none border-none transition px-1 py-1"
            />
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