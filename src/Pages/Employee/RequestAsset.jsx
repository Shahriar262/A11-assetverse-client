import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";

const RequestAsset = () => {
  const { user } = useAuth();
  const [assets, setAssets] = useState([]);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch available assets (quantity > 0)
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/assets/available`
        );
        const data = await res.json();
        setAssets(data);
      } catch (err) {
        toast.error("Failed to fetch assets");
      }
    };
    fetchAssets();
  }, []);

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
    if (!note.trim()) {
      toast.error("Please add a note for the request");
      return;
    }

    setLoading(true);

    try {
      const requestData = {
        assetId: selectedAsset.id,
        assetName: selectedAsset.name,
        assetType: selectedAsset.type,
        companyName: selectedAsset.companyName,
        quantity: 1,
        employeeEmail: user.email,
        employeeName: user.displayName,
        note,
        status: "Pending",
        requestDate: new Date().toISOString(),
      };

      await fetch(`${import.meta.env.VITE_API_URL}/requests`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(requestData),
      });

      toast.success("Asset request created");
      closeModal();
    } catch (err) {
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
            key={asset.id}
            className="bg-white shadow rounded-lg overflow-hidden border"
          >
            <img
              src={asset.image || "https://via.placeholder.com/150"}
              alt={asset.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-lg">{asset.name}</h3>
              <p className="text-gray-600">Type: {asset.type}</p>
              <p className="text-gray-600">Available: {asset.quantity}</p>

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
              Request "{selectedAsset.name}"
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
