import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AssetList = () => {
  const axiosSecure = useAxiosSecure();
  const [assets, setAssets] = useState([]);
  const [search, setSearch] = useState("");

  // Load all assets from server
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await axiosSecure.get("/assets");
        setAssets(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch assets");
      }
    };
    fetchAssets();
  }, [axiosSecure]);

  // Search filter
  const filteredAssets = assets.filter((asset) =>
    asset.productName.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this asset?"
    );
    if (!confirmDelete) return;

    try {
      await axiosSecure.delete(`/assets/${id}`);
      setAssets((prev) => prev.filter((asset) => asset._id !== id));
      toast.success("Asset deleted");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete asset");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Asset List</h2>

        <input
          type="text"
          placeholder="Search asset..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-3 md:mt-0 px-4 py-2 border rounded-md focus:outline-indigo-500 w-full md:w-64"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Asset
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Name
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Type
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Quantity
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">
                Date Added
              </th>
              <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredAssets.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No assets found
                </td>
              </tr>
            ) : (
              filteredAssets.map((asset) => (
                <tr key={asset._id} className="border-t">
                  {/* Image */}
                  <td className="px-4 py-3">
                    <img
                      src={
                        asset.productImage || "https://via.placeholder.com/50"
                      }
                      alt={asset.productName}
                      className="w-12 h-12 rounded object-cover border"
                    />
                  </td>

                  {/* Name */}
                  <td className="px-4 py-3 text-sm text-gray-800">
                    {asset.productName}
                  </td>

                  {/* Type */}
                  <td className="px-4 py-3 text-sm">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        asset.productType === "Returnable"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {asset.productType}
                    </span>
                  </td>

                  {/* Quantity */}
                  <td className="px-4 py-3 text-sm text-gray-700">
                    {asset.availableQuantity}
                  </td>

                  {/* Date */}
                  <td className="px-4 py-3 text-sm text-gray-500">
                    {new Date(asset.dateAdded).toLocaleDateString()}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3 text-center space-x-2">
                    <button className="px-3 py-1 text-sm bg-indigo-100 text-indigo-600 rounded hover:bg-indigo-200">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(asset._id)}
                      className="px-3 py-1 text-sm bg-red-100 text-red-600 rounded hover:bg-red-200"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AssetList;
