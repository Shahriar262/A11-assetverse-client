import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyAssets = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [assets, setAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Fetch assigned assets from server
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await axiosSecure.get("/assets/assigned");
        setAssets(res.data);
      } catch (err) {
        toast.error("Failed to fetch assets");
        console.error(err);
      }
    };

    if (user?.email) fetchAssets();
  }, [user, axiosSecure]);

  // Return asset
  const handleReturn = async (assetId) => {
    try {
      await axiosSecure.patch(`/assets/return/${assetId}`);
      toast.success("Asset returned successfully");
      setAssets((prev) =>
        prev.map((a) => (a.id === assetId ? { ...a, status: "Returned" } : a))
      );
    } catch (err) {
      toast.error("Failed to return asset");
      console.error(err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  // Apply search and filter
  const filteredAssets = assets
    .filter((a) => a.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((a) => (filterType === "all" ? true : a.type === filterType));

  return (
    <div className="p-6 bg-white rounded-lg shadow space-y-6">
      <h2 className="text-2xl font-semibold">My Assets</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <input
          type="text"
          placeholder="Search by asset name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input w-full md:w-1/3"
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="input w-full md:w-1/4"
        >
          <option value="all">All Types</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-returnable">Non-returnable</option>
        </select>

        <button
          onClick={handlePrint}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Print
        </button>
      </div>

      {/* Assets Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Asset Name</th>
              <th className="border px-4 py-2">Type</th>
              <th className="border px-4 py-2">Company</th>
              <th className="border px-4 py-2">Request Date</th>
              <th className="border px-4 py-2">Approval Date</th>
              <th className="border px-4 py-2">Status</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAssets.length > 0 ? (
              filteredAssets.map((asset) => (
                <tr key={asset.id} className="text-center">
                  <td className="border px-4 py-2">
                    <img
                      src={asset.image || "https://via.placeholder.com/50"}
                      alt={asset.name}
                      className="w-12 h-12 object-cover mx-auto rounded"
                    />
                  </td>
                  <td className="border px-4 py-2">{asset.name}</td>
                  <td className="border px-4 py-2">{asset.type}</td>
                  <td className="border px-4 py-2">{asset.companyName}</td>
                  <td className="border px-4 py-2">
                    {new Date(asset.requestDate).toLocaleDateString()}
                  </td>
                  <td className="border px-4 py-2">
                    {asset.approvalDate
                      ? new Date(asset.approvalDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="border px-4 py-2 font-semibold">
                    {asset.status}
                  </td>
                  <td className="border px-4 py-2">
                    {asset.status === "Approved" &&
                    asset.type === "Returnable" ? (
                      <button
                        onClick={() => handleReturn(asset.id)}
                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                      >
                        Return
                      </button>
                    ) : (
                      "-"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="border px-4 py-2 text-gray-500">
                  No assets found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyAssets;
