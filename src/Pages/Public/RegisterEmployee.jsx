import { Link, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { imgUpload } from "../../utils";

const RegisterEmployee = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const dateOfBirth = form.dateOfBirth.value;
    const imageFile = form.image.files[0];

    try {
      // Firebase user create
      await createUser(email, password);

      // Upload image if exists
      let photoURL = null;
      if (imageFile) {
        photoURL = await imgUpload(imageFile);
      }

      await updateUserProfile(name, photoURL);

      // Save user in backend
      const employeeUser = {
        name,
        email,
        dateOfBirth,
        role: "employee",
        profileImage: photoURL,
      };

      await fetch(`${import.meta.env.VITE_API_URL}/user`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(employeeUser),
      });

      toast.success("Employee account created");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to create account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col max-w-md w-[94%] md:w-full p-6 mt-6 md:mt-0 shadow-lg rounded-md sm:p-10 bg-white text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Register as Employee</h1>
          <p className="text-sm text-gray-400">Create your personal account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              name="name"
              id="name"
              required
              placeholder="Enter your full name"
              className="input w-full"
            />
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              placeholder="Enter your personal email"
              className="input w-full"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              minLength={6}
              placeholder="Enter your password"
              className="input w-full"
            />
          </div>

          {/* Date of Birth */}
          <div>
            <label
              htmlFor="dateOfBirth"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              required
              className="input w-full"
            />
          </div>

          {/* Profile Image */}
          <div>
            <label
              htmlFor="image"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Profile Image
            </label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-md file:border-0
                file:text-sm file:font-semibold
                file:bg-indigo-50 file:text-indigo-700
                hover:file:bg-indigo-100
                bg-gray-100 border border-dashed border-indigo-300 rounded-md cursor-pointer
                focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400
                py-2"
            />
            <p className="mt-1 text-xs text-gray-400">
              PNG, JPG or JPEG (max 2MB)
            </p>
          </div>

          <button className="bg-indigo-600 w-full rounded-md py-3 text-white">
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto" />
            ) : (
              "Register as Employee"
            )}
          </button>
        </form>

        <p className="px-6 text-sm text-center text-gray-400 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="hover:underline hover:text-indigo-500 text-gray-600"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterEmployee;
