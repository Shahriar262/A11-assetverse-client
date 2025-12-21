import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const RequestAsset = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch available assets (quantity > 0)
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await axiosSecure.get("/available-assets");
        setAssets(res.data);
      } catch (err) {
        toast.error("Failed to fetch assets");
      }
    };
    fetchAssets();
  }, [axiosSecure]);

  const openModal = (asset) => {
    setSelectedAsset(asset);
    setNote("");
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedAsset(null);
    setNote("");
    setModalOpen(false);
  };

  const handleRequest = async () => {
    if (!selectedAsset) return;

    setLoading(true);

    try {
      await axiosSecure.post("/requests", {
        assetId: selectedAsset._id,
        note,
      });

      toast.success("Asset request created");
      closeModal();
    } catch (err) {
      console.error(err);
      toast.error("Failed to request asset");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">Request an Asset</h2>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {assets.map((asset) => (
          <div
            key={asset._id}
            className="bg-white shadow rounded-lg overflow-hidden border"
          >
            <img
              src={asset.productImage || "https://via.placeholder.com/150"}
              alt={asset.productName}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-lg">{asset.productName}</h3>
              <p className="text-gray-600">Type: {asset.productType}</p>
              <p className="text-gray-600">
                Available: {asset.availableQuantity}
              </p>

              <button
                onClick={() => openModal(asset)}
                className="w-full mt-2 bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
              >
                Request
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Request Modal */}
      {modalOpen && selectedAsset && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4">
              Request "{selectedAsset.productName}"
            </h3>
            <textarea
              placeholder="Add a note for your request..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3 text-gray-800"
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleRequest}
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
              >
                {loading ? "Requesting..." : "Submit Request"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestAsset;
