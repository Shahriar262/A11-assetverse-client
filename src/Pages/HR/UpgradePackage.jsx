import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";

const UpgradePackage = () => {
  const [packages, setPackages] = useState([]);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const navigate = useNavigate();

  // Load available packages and payment history
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const pkgRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/packages`
        );
        setPackages(pkgRes.data);

        const historyRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/payments`
        );
        setPaymentHistory(historyRes.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load packages or payment history");
      }
    };

    fetchPackages();
  }, []);

  const handlePayment = async (pkg) => {
    try {
      // Create checkout session on backend
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-stripe-session`,
        { packageId: pkg._id }
      );

      // Redirect user to Stripe Checkout page (server returns URL)
      if (data.url) {
        window.location.href = data.url;
      } else {
        toast.error("Failed to initiate payment");
      }
    } catch (err) {
      console.error(err);
      toast.error("Payment failed. Try again.");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow space-y-8">
      <h2 className="text-2xl font-semibold">Upgrade Package</h2>

      {/* Packages */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <div
            key={pkg._id}
            className="border rounded-lg p-4 flex flex-col justify-between shadow hover:shadow-md transition"
          >
            <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
            <p className="text-gray-600 mb-2">Limit: {pkg.limit} employees</p>
            <p className="text-gray-800 font-bold mb-4">${pkg.price}</p>
            <button
              onClick={() => handlePayment(pkg)}
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
              Upgrade
            </button>
          </div>
        ))}
      </div>

      {/* Payment History */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Payment History</h3>
        {paymentHistory.length === 0 ? (
          <p className="text-gray-500">No payments yet.</p>
        ) : (
          <table className="w-full border-collapse border">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-4 py-2 text-left">Package</th>
                <th className="border px-4 py-2 text-left">Amount</th>
                <th className="border px-4 py-2 text-left">Date</th>
                <th className="border px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((ph) => (
                <tr key={ph._id}>
                  <td className="border px-4 py-2">{ph.packageName}</td>
                  <td className="border px-4 py-2">${ph.amount}</td>
                  <td className="border px-4 py-2">
                    {new Date(ph.date).toLocaleDateString()}
                  </td>
                  <td
                    className={`border px-4 py-2 font-semibold ${
                      ph.status === "Success"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {ph.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UpgradePackage;
