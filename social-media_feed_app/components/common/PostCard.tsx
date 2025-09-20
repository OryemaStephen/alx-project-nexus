import Image from "next/image";
import { Heart, MessageCircle, Share } from "lucide-react";
import { PostCardProps } from "@/interfaces";
import { useState } from "react";
import { toast } from "react-toastify";

const PostCard: React.FC<PostCardProps> = ({ post, onOpenPost }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likeCount);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(likeCount - 1);
    } else {
      setLikeCount(likeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  return (
    <div className="bg-white text-black w-full md:max-w-4xl rounded-2xl shadow-lg p-6">
      <div className="flex items-center mb-4">
        <span className="font-bold text-amber-900 cursor-pointer hover:underline">
          {post.author.username}
        </span>
        <span className="text-gray-500 text-sm ml-2">
          {new Date(post.createdAt).toLocaleString()}
        </span>
      </div>

      {post.content && <p className="mb-4 text-gray-800">{post.content}</p>}

      {post.imageUrl && (
        <div className="w-full h-auto rounded-lg mb-4 overflow-hidden">
          <Image
            src={post.imageUrl}
            alt="Post image"
            width={400}
            height={300}
            className="rounded-lg w-full max-h-72"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      )}

      <div className="flex justify-between border-t border-gray-200 pt-3">
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 ${
            isLiked ? "text-red-500" : "text-gray-500"
          }`}
        >
          {likeCount}{" "}
          <Heart size={20} fill={isLiked ? "currentColor" : "none"} />
          
          {likeCount >1 ?"Likes":"Like"}
        </button>

        <button
          onClick={onOpenPost}
          className="flex items-center gap-1 text-gray-500"
        >
          {post.commentCount} <MessageCircle size={20} />
          {post.commentCount >1 ?"Comments":"Comment"}
        </button>

        <button onClick={()=> toast.info("Shared content success")} className="flex items-center gap-1 text-gray-500">
          <Share size={20} />
          Share
        </button>
      </div>
    </div>
  );
};

export default PostCard;
