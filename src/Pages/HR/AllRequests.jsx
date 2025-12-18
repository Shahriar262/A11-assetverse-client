import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const AllRequests = () => {
  const [requests, setRequests] = useState([]);

  // Load mock data
  useEffect(() => {
    const demoRequests = [
      {
        _id: "req1",
        employee: "John Doe",
        asset: "Laptop",
        assetId: "asset1",
        date: "2024-01-10",
        status: "Pending",
        quantity: 1,
      },
      {
        _id: "req2",
        employee: "Jane Smith",
        asset: "Office Chair",
        assetId: "asset2",
        date: "2024-01-12",
        status: "Approved",
        quantity: 1,
      },
      {
        _id: "req3",
        employee: "Mike Johnson",
        asset: "Monitor",
        assetId: "asset3",
        date: "2024-01-15",
        status: "Rejected",
        quantity: 1,
      },
    ];
    setRequests(demoRequests);
  }, []);

  const handleApprove = (id) => {
    const confirm = window.confirm("Approve this request?");
    if (!confirm) return;

    // Backend API call here to update status, deduct asset quantity, add affiliation
    setRequests((prev) =>
      prev.map((req) => (req._id === id ? { ...req, status: "Approved" } : req))
    );
    toast.success("Request approved");
  };

  const handleReject = (id) => {
    const confirm = window.confirm("Reject this request?");
    if (!confirm) return;

    // Backend API call here to update status
    setRequests((prev) =>
      prev.map((req) => (req._id === id ? { ...req, status: "Rejected" } : req))
    );
    toast.error("Request rejected");
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6">Employee Asset Requests</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="p-3">Employee</th>
              <th className="p-3">Asset</th>
              <th className="p-3">Request Date</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-6 text-center text-gray-500">
                  No requests found
                </td>
              </tr>
            ) : (
              requests.map((req) => (
                <tr key={req._id} className="border-b hover:bg-gray-50 text-sm">
                  <td className="p-3 font-medium">{req.employee}</td>
                  <td className="p-3">{req.asset}</td>
                  <td className="p-3">
                    {new Date(req.date).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        req.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : req.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="p-3 text-center space-x-2">
                    {req.status === "Pending" && (
                      <>
                        <button
                          onClick={() => handleApprove(req._id)}
                          className="px-3 py-1 text-xs rounded bg-green-100 text-green-700 hover:bg-green-200"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(req._id)}
                          className="px-3 py-1 text-xs rounded bg-red-100 text-red-700 hover:bg-red-200"
                        >
                          Reject
                        </button>
                      </>
                    )}
                    {req.status !== "Pending" && (
                      <span className="text-gray-500 text-xs">No Actions</span>
                    )}
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

export default AllRequests;
