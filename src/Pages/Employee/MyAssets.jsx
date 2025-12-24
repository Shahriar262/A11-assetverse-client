import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyAssets = () => {
  const axiosSecure = useAxiosSecure();
  const [assets, setAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const { data } = await axiosSecure.get("/assigned-assets/my");
        console.log(data);

        setAssets(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch assigned assets");
      }
    };
    fetchAssets();
  }, [axiosSecure]);

  const handleReturn = async (id) => {
    try {
      await axiosSecure.patch(`/assigned-assets/${id}/return`);
      setAssets((prev) =>
        prev.map((a) => (a._id === id ? { ...a, status: "returned" } : a))
      );
      toast.success("Asset returned successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to return asset");
    }
  };

  const filteredAssets = assets
    .filter((a) =>
      a.assetName?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((a) => (filterType === "all" ? true : a.assetType === filterType));

  return (
    <div className="p-6 bg-white rounded-lg shadow space-y-6">
      <h2 className="text-2xl font-semibold">My Assets</h2>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <input
          type="text"
          placeholder="Search by asset name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input w-full sm:w-1/3"
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="input w-full sm:w-1/4"
        >
          <option value="all">All Types</option>
          <option value="Returnable">Returnable</option>
          <option value="Non-returnable">Non-returnable</option>
        </select>
        <button
          onClick={() => window.print()}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
        >
          Print
        </button>
      </div>

      {filteredAssets.length === 0 ? (
        <p className="text-gray-500">No assets found.</p>
      ) : (
        <>
          
          <div className="hidden sm:block overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">Image</th>
                  <th className="border px-4 py-2">Asset Name</th>
                  <th className="border px-4 py-2">Type</th>
                  <th className="border px-4 py-2">Company</th>
                  <th className="border px-4 py-2">Assignment Date</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAssets.map((asset) => (
                  <tr key={asset._id} className="text-center">
                    <td className="border px-4 py-2">
                      <img
                        src={
                          asset.assetImage || "https://via.placeholder.com/50"
                        }
                        className="w-12 h-12 mx-auto rounded object-cover"
                      />
                    </td>
                    <td className="border px-4 py-2">{asset.assetName}</td>
                    <td className="border px-4 py-2">{asset.assetType}</td>
                    <td className="border px-4 py-2">
                      {asset.companyName || "-"}
                    </td>
                    <td className="border px-4 py-2">
                      {new Date(asset.assignmentDate).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2 font-semibold capitalize">
                      {asset.status}
                    </td>
                    <td className="border px-4 py-2">
                      {asset.status === "assigned" &&
                      asset.assetType === "Returnable" ? (
                        <button
                          onClick={() => handleReturn(asset._id)}
                          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                        >
                          Return
                        </button>
                      ) : (
                        "-"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

         
          <div className="sm:hidden space-y-4">
            {filteredAssets.map((asset) => (
              <div key={asset._id} className="border rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={asset.assetImage || "https://via.placeholder.com/50"}
                    className="w-14 h-14 rounded object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{asset.assetName}</h3>
                    <p className="text-xs text-gray-500">
                      {asset.companyName || "-"}
                    </p>
                  </div>
                </div>

                <div className="text-sm space-y-1 mb-3">
                  <p>
                    <span className="font-medium">Type:</span> {asset.assetType}
                  </p>
                  <p>
                    <span className="font-medium">Assigned:</span>{" "}
                    {new Date(asset.assignmentDate).toLocaleDateString()}
                  </p>
                  <p
                    className={`font-semibold capitalize ${
                      asset.status === "assigned"
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    Status: {asset.status}
                  </p>
                </div>

                {asset.status === "assigned" &&
                asset.assetType === "Returnable" ? (
                  <button
                    onClick={() => handleReturn(asset._id)}
                    className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                  >
                    Return Asset
                  </button>
                ) : (
                  <p className="text-center text-gray-400 text-sm">
                    No actions
                  </p>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MyAssets;
