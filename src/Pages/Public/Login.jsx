import { Link, Navigate, useLocation, useNavigate } from "react-router";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../Components/Shared/LoadingSpinner";
import { useEffect } from "react";

const Login = () => {
  const { signIn, loading, user, role, authReady } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state || "/";

  useEffect(() => {
    if (authReady && user && role) {
      navigate(from, { replace: true });
    }
  }, [authReady, user, role, navigate, from]);

  if (loading || !authReady) return <LoadingSpinner />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signIn(email, password);
      toast.success("Login successful");
    } catch (err) {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="max-w-md w-[94%] md:w-full bg-white p-8 rounded-lg shadow">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Login</h1>
          <p className="text-sm text-gray-500 mt-3">
            Access your AssetVerse account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              required
              className="w-full px-3 py-2 border rounded focus:outline-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              name="password"
              required
              className="w-full px-3 py-2 border rounded focus:outline-indigo-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-6">
          Don’t have an account?{" "}
          <div className="flex justify-center gap-4 mt-3">
            <Link
              to="/register-employee"
              className="text-indigo-600 hover:underline text-sm"
            >
              Join as Employee
            </Link>

            <Link
              to="/register-hr"
              className="text-indigo-600 hover:underline text-sm"
            >
              Join as HR Manager
            </Link>
          </div>
        </p>
      </div>
    </div>
  );
};

export default Login;
