import { useQuery } from "@apollo/client/react";
import { Loader2 } from "lucide-react";
import Avatar from "@/components/common/Avatar";
import { CommentsQueryResult, Comment, CommentsProps } from "@/interfaces";
import { GET_COMMENTS_QUERY } from "@/graphql/requests/get/getPostComments";

const Comments: React.FC<CommentsProps> = ({ postId }) => {
  const { data, loading, error } = useQuery<CommentsQueryResult>(
    GET_COMMENTS_QUERY,
    {
      variables: { postId },
    }
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-4">
        <Loader2 className="animate-spin" size={24} />
        <span className="ml-2 text-gray-600">Loading comments...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-500 text-center py-4">
        Failed to load comments. Please try again.
      </div>
    );
  }

  const comments = data?.comments || [];

  if (comments.length === 0) {
    return (
      <div className="text-gray-500 text-center py-4">
        No comments yet. Be the first to comment!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((comment: Comment) => (
        <div key={comment.id} className="border-b border-gray-200 pb-4">
          <div className="flex items-center mb-2 gap-3">
            <Avatar
              username={comment.user.username}
              profilePicture={comment.user.profilePicture}
              size="sm"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-black">
                {comment.user.username}
              </span>
              <span className="text-gray-500 text-sm">
                {new Date(comment.createdAt).toLocaleString()}
              </span>
            </div>
          </div>
          <p className="text-gray-700">{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Comments;
