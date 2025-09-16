import Button from "@/components/common/Button";
import Logo from "@/components/common/Logo";
import BrowserTitle from "@/components/layout/BrowserTitle";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

const Register: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password1, setPassword1] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmPassword, setConfirmPassword] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast.success("Registration  successful 🚀");
    router.push("/auth/login");
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
              placeholder="Full Name"
              className="w-full border rounded-lg px-3 py-2 focus:ring-0 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded-lg px-3 py-2 focus:ring-0 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full border rounded-lg px-3 py-2 focus:ring-0 focus:outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>
            </div>
            <div className="relative">
              <input
                type={confirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                className="w-full border rounded-lg px-3 py-2 focus:ring-0 focus:outline-none"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setConfirmPassword(!confirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {confirmPassword ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>
            </div>
            <Button
              title="Register"
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
