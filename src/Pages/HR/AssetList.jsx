import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { TbFidgetSpinner } from "react-icons/tb";

const AssetList = () => {
  const axiosSecure = useAxiosSecure();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssets = async () => {
      setLoading(true);
      try {
        const { data } = await axiosSecure.get("/assets?mine=true");
        setAssets(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch assets");
      } finally {
        setLoading(false);
      }
    };
    fetchAssets();
  }, [axiosSecure]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this asset?")) return;
    try {
      await axiosSecure.delete(`/assets/${id}`);
      setAssets((prev) => prev.filter((a) => a._id !== id));
      toast.success("Asset deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete asset");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <TbFidgetSpinner className="animate-spin text-4xl text-indigo-600" />
      </div>
    );

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Assets Lists</h2>
      {assets.length === 0 ? (
        <p className="text-gray-500">No assets found.</p>
      ) : (
        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Available Quantity</th>
              <th className="border px-4 py-2">Date Added</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {assets.map((asset) => (
              <tr key={asset._id}>
                <td className="border px-4 py-2">
                  <img
                    src={
                      asset.productImage || "https://i.ibb.co/2kRZ5q0/user.png"
                    }
                    alt={asset.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="border px-4 py-2">{asset.name}</td>
                <td className="border px-4 py-2">{asset.type}</td>
                <td className="border px-4 py-2">{asset.availableQuantity}</td>
                <td className="border px-4 py-2">
                  {new Date(asset.dateAdded).toLocaleDateString()}
                </td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleDelete(asset._id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AssetList;
