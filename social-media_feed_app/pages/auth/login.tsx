import {  useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Logo from "@/components/common/Logo";
import BrowserTitle from "@/components/layout/BrowserTitle";
import { LoginFormProps, LoginMutationData } from "@/interfaces";
import { useMutation } from "@apollo/client/react";
import { LOGIN_MUTATION } from "@/graphql/requests/posts/login";

const Login: React.FC = () => {
  const router = useRouter();
  const [formState, setFormState] = useState<LoginFormProps>({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginMutation] = useMutation<LoginMutationData>(LOGIN_MUTATION);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formState.username) {
      toast.error("Please enter password.");
      return;
    } else if (!formState.password) {
      toast.error("Please enter username .");
      return;
    }

    setLoading(true);
    try {
      const { data } = await loginMutation({
        variables: {
          username: formState.username,
          password: formState.password,
        },
      });

      const { token, refreshExpiresIn } = data!.tokenAuth;

      if (!token || !refreshExpiresIn) {
        throw new Error("No tokens returned from server.");
      }

      localStorage.setItem("access_token", token);
      toast.success("Login successful 🚀");
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <BrowserTitle title="Login" />
      <div className="flex items-center justify-center bg-gray-100 min-h-screen p-4">
        <div className="w-full max-w-md bg-white text-black rounded-2xl shadow-lg p-8">
          <div className="w-full pb-5 flex items-center justify-center">
            <Logo />
          </div>
          <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full border rounded-lg px-3 py-2 focus:ring-0 focus:outline-none"
              value={formState.username}
              onChange={handleInputChange}
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full border rounded-lg px-3 py-2 focus:ring-0 focus:outline-none"
                value={formState.password}
                onChange={handleInputChange}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className= "flex w-full items-center gap-2 justify-center cursor-pointer px-8 py-2 border-2 border-[#A9DEF9] bg-[#A9DEF9] rounded-full hover:bg-[#6396b0] text-black transition-colors duration-300"
            >
              {loading ? (
                  <div className="flex items-center gap-1">
                    <Loader2 className="animate-spin"/> Logging in ...
                  </div>
                ) : (
                  "Login"
                )}
            </button>
          </form>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <span
              onClick={() => router.push("/auth/register")}
              className="text-amber-900 font-bold cursor-pointer hover:underline"
            >
              Register
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
