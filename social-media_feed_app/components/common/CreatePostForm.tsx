import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Button from "@/components/common/Button";
import { useMutation } from "@apollo/client/react";
import { PostFormProps } from "@/interfaces";
import { CREATE_POST_MUTATION } from "@/graphql/requests/posts/createPost";

const CreatePostForm: React.FC = () => {
  const router = useRouter();
  const [formState, setFormState] = useState<PostFormProps>({
    content: "",
    imageUrl: "",
  });
  const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formState.content.trim()) {
      toast.error("Post content is required.");
      return;
    }

    try {
      const { data } = await createPost({
        variables: {
          content: formState.content,
          imageUrl: formState.imageUrl || null,
        },
      });

      console.log("Post created:", data);

      toast.success("Post created successfully! 🎉");
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

  return (
    <>
      <div className="w-full bg-white text-black rounded-2xl shadow-lg p-4">
        <h1 className="font-bold  mb-4">Create a New Post</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            name="content"
            placeholder="What's on your mind?"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-0 focus:ring-gray-200  focus:outline-none resize-y min-h-[40px]"
            value={formState.content}
            onChange={handleInputChange}
          />
          {/* <input
            type="url"
            name="imageUrl"
            placeholder="Image URL (optional)"
            className="w-full border rounded-lg px-3 py-2 focus:ring-0 focus:outline-none"
            value={formState.imageUrl}
            onChange={handleInputChange}
          /> */}
          <Button
            title={loading ? "Creating..." : "Create Post"}
            type="submit"
            className="rounded-md hover:bg-[#9dcce3] transition"
          />
        </form>
      </div>
    </>
  );
};

export default CreatePostForm;
