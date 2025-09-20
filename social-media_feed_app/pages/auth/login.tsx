import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import Button from "@/components/common/Button";
import Logo from "@/components/common/Logo";
import BrowserTitle from "@/components/layout/BrowserTitle";
import { LoginFormProps } from "@/interfaces";
import { LOGIN_MUTATION } from "@/graphql/requests/posts/login";
import { useMutation } from "@apollo/client/react";

const Login: React.FC = () => {
  const router = useRouter();
  const [formState, setFormState] = useState<LoginFormProps>({
    email: "",
    password: "",
    showPassword: false,
  });

  const [login, { loading }] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    router.push("/dashboard");
    // if (!formState.email || !formState.password) {
    //   toast.error('Please enter both email and password.');
    //   return;
    // }

    // try {
    //   const { data } = await login({
    //     variables: {
    //       email: formState.email,
    //       password: formState.password,
    //     },
    //   });

    //   console.log('Login response data:', data);

    //   const token = data?.tokenAuth?.token;
    //   if (!token) {
    //     throw new Error('No token returned from server.');
    //   }

    //   localStorage.setItem('token', token);
    //   toast.success('Login successful 🚀');
    //   router.push('/dashboard');
    // } catch (error: unknown) {
    //   const errorMessage =
    //     error instanceof Error ? error.message : 'Login failed. Please check your credentials.';
    //   toast.error(errorMessage);
    // }
  };

  const togglePasswordVisibility = () => {
    setFormState((prev) => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <BrowserTitle title="Login" />
      <div className="flex items-center justify-center min-h-screen p-4 bg-black">
        <div className="w-full max-w-md bg-white text-black rounded-2xl shadow-lg p-8">
          <div className="w-full pb-5 flex items-center justify-center">
            <Logo />
          </div>
          <h1 className="text-2xl font-bold text-center mb-6">Welcome Back</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full border rounded-lg px-3 py-2 focus:ring-0 focus:outline-none"
              value={formState.email}
              onChange={handleInputChange}
            />
            <div className="relative">
              <input
                type={formState.showPassword ? "text" : "password"}
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
                {formState.showPassword ? (
                  <Eye className="w-5 h-5" />
                ) : (
                  <EyeOff className="w-5 h-5" />
                )}
              </button>
            </div>
            <Button
              title={loading ? "Logging in..." : "Login"}
              type="submit"
              className="w-full py-2 rounded-lg hover:bg-[#9dcce3] transition"
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
