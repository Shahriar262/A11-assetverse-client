import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

const UpgradePackage = () => {
  const axiosSecure = useAxiosSecure();
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const { data } = await axiosSecure.get("/packages");
        setPackages(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch packages");
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, [axiosSecure]);

  const handlePurchase = async (packageId) => {
    try {
      const { data } = await axiosSecure.post("/create-checkout-session", {
        packageId,
      });
      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      toast.error("Checkout failed");
    }
  };

  if (loading) return <p>Loading packages...</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Upgrade Package</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {packages.map((pkg) => (
          <div key={pkg._id} className="border p-4 rounded-lg">
            <h3 className="text-xl font-bold mb-2">{pkg.name}</h3>
            <p className="mb-2">Employee Limit: {pkg.employeeLimit}</p>
            <p className="mb-2">Price: ${pkg.price}</p>
            <ul className="mb-4 list-disc list-inside">
              {pkg.features.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
            </ul>
            <button
              onClick={() => handlePurchase(pkg._id)}
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpgradePackage;
