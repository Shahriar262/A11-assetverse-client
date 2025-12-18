import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { imgUpload } from "../../utils";
import { toast } from "react-hot-toast";

const Profile = () => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    photo: "",
    affiliations: [],
  });

  // Load profile data
  useEffect(() => {
    if (user) {
      setProfile({
        name: user.displayName || "",
        photo: user.photoURL || "",
        affiliations: user?.affiliations || ["TechSoft Ltd", "Innova Corp"], 
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = profile.photo;

      if (e.target.image.files[0]) {
        imageUrl = await imgUpload(e.target.image.files[0]);
      }

      

      toast.success("Profile updated successfully");

      setProfile((prev) => ({
        ...prev,
        photo: imageUrl,
      }));
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">My Profile</h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Profile Image */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Profile Picture
          </label>
          <div className="flex items-center gap-4">
            <img
              src={profile.photo || "https://i.ibb.co/ZYW3VTp/brown-brim.png"}
              alt="profile"
              className="w-20 h-20 rounded-full object-cover border"
            />
            <input
              type="file"
              name="image"
              accept="image/*"
              className="text-sm"
            />
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block mb-2 text-sm font-medium">Full Name</label>
          <input
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            className="input w-full"
            required
          />
        </div>

        {/* Email (Read-only) */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Email Address
          </label>
          <input
            value={user?.email || ""}
            readOnly
            className="input w-full bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Company Affiliations (Read-only) */}
        <div>
          <label className="block mb-2 text-sm font-medium">
            Company Affiliations
          </label>
          <div className="flex flex-wrap gap-2">
            {profile.affiliations.map((company, idx) => (
              <span
                key={idx}
                className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm"
              >
                {company}
              </span>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <button
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Profile;
