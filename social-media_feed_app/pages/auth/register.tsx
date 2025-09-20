import Button from "@/components/common/Button";
import Logo from "@/components/common/Logo";
import BrowserTitle from "@/components/layout/BrowserTitle";
import { CREATE_USER } from "@/graphql/requests/posts/createUser";
import { RegisterFormProps } from "@/interfaces";
import { useMutation } from "@apollo/client/react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormProps>({
    username: "",
    email: "",
    password: "",
    password1: "",
    showPassword: false,
    confirmPassword: false,
  });
  const router = useRouter();

  const [createUser, { loading }] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      console.log("User created:", data);
      toast.success("Registration successful 🚀");
      router.push("/auth/login");
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred during registration");
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.password1) {
      toast.error("Passwords do not match");
      return;
    }
    const usernameRegex = /^[A-Za-z0-9@.+-_]{1,150}$/;
    if (!usernameRegex.test(formData.username)) {
      toast.error(
        "Username must be 150 characters or fewer and contain only letters, digits, @, ., +, -, or _"
      );
      return;
    }

    try {
      await createUser({
        variables: {
          username: formData.username,
          email: formData.email,
          password: formData.password,
        },
      });
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name as keyof RegisterFormProps]: e.target.value,
    });
  };

  const togglePasswordVisibility = (
    field: "showPassword" | "confirmPassword"
  ) => {
    setFormData({ ...formData, [field]: !formData[field] });
  };

  return (
    <>
      <BrowserTitle title="Sign Up" />
      <div className="flex items-center justify-center min-h-screen p-4 bg-black">
        <div className="w-full max-w-md bg-white text-black rounded-2xl shadow-lg p-8">
          <div className="w-full pb-5 flex items-center justify-center">
            <Logo />
          </div>
          <h1 className="text-2xl font-bold text-center mb-6">
            Create Account
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="UserName"
              className="w-full border rounded-lg px-3 py-2 focus:ring-0 focus:outline-none"
              value={formData.username}
              onChange={handleChange}
              required
              maxLength={150}
              pattern="[A-Za-z0-9@.+-_]+"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border rounded-lg px-3 py-2 focus:ring-0 focus:outline-none"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <div className="relative">
              <input
                type={formData.showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full border rounded-lg px-3 py-2 focus:ring-0 focus:outline-none"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("showPassword")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {formData.showPassword ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>
            </div>
            <div className="relative">
              <input
                type={formData.confirmPassword ? "text" : "password"}
                name="password1"
                placeholder="Confirm Password"
                className="w-full border rounded-lg px-3 py-2 focus:ring-0 focus:outline-none"
                value={formData.password1}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirmPassword")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {formData.confirmPassword ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>
            </div>
            <Button
              title={loading ? "Registering..." : "Register"}
              type="submit"
              className="w-full py-2 rounded-lg hover:bg-[#9dcce3] transition"
            />
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => router.push("/auth/login")}
              className="text-amber-900 font-bold cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
