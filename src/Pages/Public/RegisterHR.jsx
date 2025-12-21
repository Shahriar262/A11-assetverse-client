import { Link, useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";
import { imgUpload } from "../../utils";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const RegisterHR = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const companyName = form.companyName.value;
    const companyLogoFile = form.companyLogo.files[0];
    const email = form.email.value;
    const password = form.password.value;
    const dateOfBirth = form.dateOfBirth.value;

    try {
      let companyLogoUrl = "";
      if (companyLogoFile) {
        companyLogoUrl = await imgUpload(companyLogoFile);
      }

      // 1️⃣ Firebase create
      await createUser(email, password);

      // 2️⃣ Firebase profile update
      await updateUserProfile(name, companyLogoUrl, "hr");

      // 3️⃣ Backend save HR & company info
      const hrUser = {
        name,
        companyName,
        companyLogo: companyLogoUrl || "",
        email,
        dateOfBirth,
        role: "hr",
        packageLimit: 5,
        currentEmployees: 0,
        subscription: "basic",
      };

      await axiosSecure.post("/user/hr", hrUser);

      toast.success("HR account created. Default package: 5 employees.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      toast.error(
        err.response?.data?.message || err.message || "Failed to create account"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen mt-6">
      <div className="flex flex-col max-w-md w-[94%] md:w-full p-6 rounded-md sm:p-10 shadow-lg bg-white text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Register as HR</h1>
          <p className="text-sm text-gray-400">Create your company account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block mb-1 text-sm font-medium">
              Full Name
            </label>
            <input
              id="name"
              name="name"
              required
              placeholder="Enter your full name"
              className="input w-full"
            />
          </div>

          <div>
            <label
              htmlFor="companyName"
              className="block mb-1 text-sm font-medium"
            >
              Company Name
            </label>
            <input
              id="companyName"
              name="companyName"
              required
              placeholder="Enter company name"
              className="input w-full"
            />
          </div>

          <div>
            <label
              htmlFor="companyLogo"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Company Logo
            </label>
            <input
              id="companyLogo"
              name="companyLogo"
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

          <div>
            <label htmlFor="email" className="block mb-1 text-sm font-medium">
              Company Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              placeholder="Enter company email"
              className="input w-full"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              required
              minLength={6}
              placeholder="Enter password"
              className="input w-full"
            />
          </div>

          <div>
            <label
              htmlFor="dateOfBirth"
              className="block mb-1 text-sm font-medium"
            >
              Date of Birth
            </label>
            <input
              id="dateOfBirth"
              type="date"
              name="dateOfBirth"
              required
              className="input w-full"
            />
          </div>

          <button
            type="submit"
            className="bg-indigo-600 w-full rounded-md py-3 text-white"
          >
            {loading ? (
              <TbFidgetSpinner className="animate-spin m-auto" />
            ) : (
              "Register as HR"
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

export default RegisterHR;
