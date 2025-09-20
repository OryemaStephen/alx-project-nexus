import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Button from "@/components/common/Button";
import { useMutation } from "@apollo/client/react";
import { PostFormProps } from "@/interfaces";
import { CREATE_POST_MUTATION } from "@/graphql/requests/posts/createPost";
import Image from "next/image";
import { ImagePlus, Send, Smile } from "lucide-react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

const CreatePostForm: React.FC = () => {
  const router = useRouter();
  const [formState, setFormState] = useState<PostFormProps>({
    content: "",
    imageUrls: [],
  });
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const emojiPickerRef = useRef<HTMLDivElement>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);
  const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    },
  });

  const MAX_IMAGES = 4;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    const allowedFiles = files.slice(0, MAX_IMAGES);

    if (files.length > MAX_IMAGES) {
      toast.warning(`You can only upload ${MAX_IMAGES} images. Select your top ${MAX_IMAGES} images to upload.`);
    }

    setFormState((prev) => ({ ...prev, imageUrls: allowedFiles }));

    const previews = allowedFiles.map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const revokePreviews = () => {
    imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    setImagePreviews([]);
  };

  const uploadImages = async (files: File[]): Promise<string[]> => {
    const urls = await Promise.all(
      files.map(async (file) => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
      })
    );
    return urls;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formState.content.trim()) {
      toast.error("Post content is required.");
      return;
    }

    try {
      const uploadedImageUrls = formState.imageUrls?.length
        ? await uploadImages(formState.imageUrls)
        : [];

      const { data } = await createPost({
        variables: {
          content: formState.content,
          imageUrls: uploadedImageUrls,
        },
      });

      console.log("Post created:", data);

      toast.success("Post created successfully! 🎉");
      revokePreviews();
      setShowEmojiPicker(false);
      router.push("/dashboard");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to create post. Please try again.";
      toast.error(errorMessage);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const clearImages = () => {
    setFormState((prev) => ({ ...prev, imageUrls: [] }));
    revokePreviews();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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

        <div className="relative flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <label htmlFor="imageUrls" className="cursor-pointer">
                <ImagePlus
                  size={24}
                  className="text-gray-500 hover:text-gray-700"
                />
              </label>
              <input
                id="imageUrls"
                type="file"
                name="imageUrls"
                accept="image/*"
                multiple
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
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

        {imagePreviews.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            {imagePreviews.map((url, index) => (
              <div
                key={index}
                className="relative w-full h-auto rounded-lg overflow-hidden"
              >
                <Image
                  src={url}
                  alt={`Preview ${index + 1}`}
                  width={200}
                  height={150}
                  className="rounded-lg w-full max-h-36"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={clearImages}
              className="text-red-500 hover:underline mt-2"
            >
              Clear Images
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default CreatePostForm;