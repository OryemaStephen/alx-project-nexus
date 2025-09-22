import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import Button from "@/components/common/Button";
import Logo from "@/components/common/Logo";
import BrowserTitle from "@/components/layout/BrowserTitle";
import { LoginFormProps } from "@/interfaces";
import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_BASE_AUTH_API_URL;

const Login: React.FC = () => {
  const router = useRouter();
  const [formState, setFormState] = useState<LoginFormProps>({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPasword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formState.username || !formState.password) {
      toast.error('Please enter both username and password.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/login/`, {
        username: formState.username,
        password: formState.password,
      });

      const { access, refresh } = response.data;

      if (!access || !refresh) {
        throw new Error('No tokens returned from server.');
      }

      if (!access || !refresh) {
        throw new Error('No tokens returned from server.');
      }

      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      toast.success('Login successful 🚀');
      router.push('/dashboard');
    } catch (error: unknown) {
      toast.error(error.response.data.detail);
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPasword(!showPassword );
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
            <Button
              title="Login"
              type="submit"
              className="w-full"
              disabled={loading}
            />
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