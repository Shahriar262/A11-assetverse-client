import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { imgUpload } from "../../utils";
import { toast } from "react-hot-toast";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";

const Profile = () => {
  const { user, role } = useAuth();

  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  // 🔹 Load profile data
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return;
      setLoading(true);
      try {
        const token = await user.getIdToken();

        if (role === "hr") {
          // HR info
          const res = await axios.get(
            `${import.meta.env.VITE_API_URL}/user/hr-info`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setName(res.data.name || user.displayName || "");
          setPhoto(res.data.profileImage || user.photoURL || "");
          if (res.data.company) {
            setCompanies([res.data.company]);
          } else {
            setCompanies([]);
          }
        } else if (role === "employee") {
          // Employee info
          const profileRes = await axios.get(
            `${import.meta.env.VITE_API_URL}/profile`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setName(profileRes.data?.name || user.displayName || "");
          setPhoto(profileRes.data?.profileImage || user.photoURL || "");

          const companyRes = await axios.get(
            `${import.meta.env.VITE_API_URL}/employee/companies`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
          setCompanies(companyRes.data || []);
        }
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user, role]);

  // 🔹 Update profile
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      let imageUrl = photo;
      if (e.target.image.files[0]) {
        imageUrl = await imgUpload(e.target.image.files[0]);
      }

      const token = await user.getIdToken();

      await axios.patch(
        `${import.meta.env.VITE_API_URL}/user/update`,
        { name, profileImage: imageUrl },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPhoto(imageUrl);
      toast.success("Profile updated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Profile update failed");
    } finally {
      setUpdating(false);
    }
  };

  // 🔹 Change password
  const handleChangePassword = async () => {
    try {
      await sendPasswordResetEmail(auth, user.email);
      toast.success("Password reset email sent");
    } catch (err) {
      console.error(err);
      toast.error("Failed to send reset email");
    }
  };

  if (loading) return <p className="text-center mt-20">Loading...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-2xl w-full md:w-4/5 lg:w-3/5">
        {/* Cover */}
        <div className="h-56 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-t-2xl" />

        <div className="flex flex-col items-center p-6 -mt-20">
          {/* Profile image */}
          <img
            src={photo || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
            alt="profile"
            className="h-24 w-24 rounded-full border-4 border-white object-cover"
          />

          {/* Role */}
          <p className="mt-3 px-4 py-1 text-xs text-white bg-indigo-500 rounded-full">
            {role === "hr" ? "HR" : "Employee"}
          </p>

          <p className="mt-2 text-sm text-gray-600">User ID: {user?.uid}</p>

          {/* Profile form */}
          <form
            onSubmit={handleUpdateProfile}
            className="w-full mt-6 space-y-4"
          >
            <div className="flex flex-wrap justify-between gap-4 text-sm text-gray-700">
              {/* Name */}
              <div className="flex flex-col w-full md:w-[45%]">
                <label className="mb-1 font-medium">Name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border px-3 py-2 rounded-md"
                  required
                />
              </div>

              {/* Email */}
              <div className="flex flex-col w-full md:w-[45%]">
                <label className="mb-1 font-medium">Email</label>
                <input
                  value={user?.email}
                  readOnly
                  className="border px-3 py-2 rounded-md bg-gray-100"
                />
              </div>

              {/* Image upload */}
              <div className="flex flex-col w-full">
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Profile Picture
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
            </div>

            {/* Buttons */}
            <div className="flex gap-3 justify-end">
              <button
                type="submit"
                disabled={updating}
                className="bg-indigo-500 px-6 py-2 rounded-lg text-white hover:bg-indigo-800 disabled:opacity-60"
              >
                {updating ? "Updating..." : "Update Profile"}
              </button>

              <button
                type="button"
                onClick={handleChangePassword}
                className="bg-indigo-500 px-6 py-2 rounded-lg text-white hover:bg-indigo-800"
              >
                Change Password
              </button>
            </div>
          </form>

          {/* Company affiliations */}
          <div className="w-full mt-6">
            <h3 className="text-sm font-semibold mb-2">Company Affiliations</h3>
            {companies.length === 0 ? (
              <p className="text-sm text-gray-500">
                No active company affiliation
              </p>
            ) : (
              <div className="flex flex-wrap gap-3">
                {companies.map((company, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full"
                  >
                    {company.companyLogo && (
                      <img
                        src={company.companyLogo}
                        alt={company.companyName}
                        className="w-5 h-5 rounded-full"
                      />
                    )}
                    <span className="text-sm font-medium">
                      {company.companyName}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
