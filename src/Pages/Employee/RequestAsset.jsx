import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const RequestAsset = () => {
  const axiosSecure = useAxiosSecure();
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const { data } = await axiosSecure.get("/assets");
        const availableAssets = data.filter((a) => a.availableQuantity > 0);
        setAssets(availableAssets);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch assets");
      } finally {
        setLoading(false);
      }
    };
    fetchAssets();
  }, [axiosSecure]);

  const handleRequest = async (assetId) => {
    try {
      await axiosSecure.post("/requests", { assetId });
      toast.success("Asset request submitted");
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Request failed");
    }
  };

  if (loading) {
    return <p className="text-center">Loading assets...</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Request an Asset
      </h2>

      {assets.length === 0 ? (
        <p className="text-center text-gray-500">No assets available</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assets.map((asset) => (
            <div
              key={asset._id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col"
            >
              <img
                src={asset.productImage || "https://i.ibb.co/2kRZ5q0/user.png"}
                alt={asset.name}
                className="h-40 w-full object-cover rounded mb-4"
              />

              <h3 className="text-lg font-semibold mb-1">{asset.name}</h3>

              <p className="text-sm text-gray-600 mb-1">
                Type: <span className="font-medium">{asset.type}</span>
              </p>

              <p className="text-sm text-gray-600 mb-4">
                Available:{" "}
                <span className="font-medium">{asset.availableQuantity}</span>
              </p>

              <button
                onClick={() => handleRequest(asset._id)}
                className="mt-auto bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
              >
                Request Asset
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RequestAsset;
