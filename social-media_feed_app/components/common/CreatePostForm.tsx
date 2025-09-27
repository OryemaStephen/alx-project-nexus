import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Button from "@/components/common/Button";
import { CREATE_POST_MUTATION } from "@/graphql/requests/posts/createPost";
import Image from "next/image";
import { Send, Smile } from "lucide-react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useMutation } from "@apollo/client/react";
import { CreatePostMutationData, PostFormProps } from "@/interfaces";
import { GET_POSTS_QUERY } from "@/graphql/requests/get/getPosts";

const CreatePostForm: React.FC = () => {
  const router = useRouter();
  const [formState, setFormState] = useState<PostFormProps>({
    content: "",
    imageUrl: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);
  const [createPost, { loading, error }] = useMutation<CreatePostMutationData>(
    CREATE_POST_MUTATION,
    {
      refetchQueries: [{ query: GET_POSTS_QUERY }],
      awaitRefetchQueries: true,
      onError: (err) => {
        toast.error(err.message || "Failed to create post. Please try again.");
      },
    }
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const imageUrl = e.target.value;
    if (!imageUrl) {
      setFormState((prev) => ({ ...prev, imageUrl: null }));
      setImagePreview(null);
      return;
    }

    setImageLoading(true);
    setFormState((prev) => ({ ...prev, imageUrl: imageUrl }));
    setImagePreview(imageUrl);
  };

  const clearImage = () => {
    setFormState((prev) => ({ ...prev, imageUrl: null }));
    setImagePreview(null);
    setImageLoading(false);
    if (imageInputRef.current) {
      imageInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formState.content.trim()) {
      toast.error("Post content is required.");
      return;
    }

    try {
      const variables = {
        content: formState.content.trim(),
        imageUrl: formState.imageUrl || null,
      };

      const { data } = await createPost({ variables });

      if (!data?.createPost?.post) {
        throw new Error("No post data returned from server");
      }

      toast.success("Post created successfully! 🎉");
      setFormState({ content: "", imageUrl: null });
      clearImage();
      setShowEmojiPicker(false);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error("Failed to create post.");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const { selectionStart, selectionEnd } = textarea;
    const newContent =
      formState.content.slice(0, selectionStart) +
      emojiData.emoji +
      formState.content.slice(selectionEnd);

    setFormState((prev) => ({ ...prev, content: newContent }));
    setShowEmojiPicker(false);

    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd =
        selectionStart + emojiData.emoji.length;
    }, 0);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        emojiPickerRef.current &&
        !emojiPickerRef.current.contains(event.target as Node) &&
        emojiButtonRef.current &&
        !emojiButtonRef.current.contains(event.target as Node)
      ) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full bg-white text-black rounded-2xl p-4">
      <h1 className="font-bold text-xl mb-4">Create a New Post</h1>
      {error && (
        <div className="text-red-500 mb-4">
          Error: {error.message || "An error occurred while creating the post."}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            name="content"
            placeholder="What's on your mind?"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-0 focus:ring-gray-200 focus:outline-none min-h-[40px] resize-none"
            value={formState.content}
            onChange={handleInputChange}
            rows={3}
            style={{ minHeight: "40px", maxHeight: "200px" }}
            ref={textareaRef}
          />
        </div>
        <div className="relative">
          <input
            type="text"
            name="imageUrl"
            placeholder="Enter image URL (eg: https://mysocial.com/image.jpg)"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-0 focus:outline-none"
            value={formState.imageUrl || ""}
            onChange={handleImageChange}
            ref={imageInputRef}
          />
        </div>
        {imagePreview && (
          <div className="grid grid-cols-1 mb-4">
            {imageLoading && <div>Loading image...</div>}
            <div className="relative w-full h-auto rounded-lg overflow-hidden">
              <Image
                src={imagePreview}
                alt="Preview"
                width={200}
                height={150}
                className="rounded-lg w-full max-h-36"
                style={{ objectFit: "cover" }}
                onLoad={() => setImageLoading(false)}
                onError={() => {
                  toast.error("Failed to load image preview.");
                  clearImage();
                }}
              />
            </div>
            <button
              type="button"
              onClick={clearImage}
              className="text-red-500 hover:underline mt-2"
            >
              Clear Image
            </button>
          </div>
        )}
        <div className="relative flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              ref={emojiButtonRef}
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="cursor-pointer"
              aria-label="Add emoji"
            >
              <Smile size={24} className="text-gray-500 hover:text-gray-700" />
            </button>
          </div>
          <Button
            title={loading ? "Creating..." : "Create Post"}
            type="submit"
            disabled={loading}
            className="rounded-md"
            icon={<Send size={16} />}
          />
          {showEmojiPicker && (
            <div className="absolute z-10 top-8 mt-2" ref={emojiPickerRef}>
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;
