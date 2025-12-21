import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);

  // Load all requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosSecure.get("/requests");
        setRequests(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch requests");
      }
    };
    fetchRequests();
  }, [axiosSecure]);

  const handleApprove = async (id) => {
    const confirmApprove = window.confirm("Approve this request?");
    if (!confirmApprove) return;

    try {
      await axiosSecure.patch(`/requests/${id}/approve`);
      setRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, requestStatus: "approved" } : req
        )
      );
      toast.success("Request approved");
    } catch (err) {
      console.error(err);
      toast.error("Failed to approve request");
    }
  };

  const handleReject = async (id) => {
    const confirmReject = window.confirm("Reject this request?");
    if (!confirmReject) return;

    try {
      await axiosSecure.patch(`/requests/${id}/reject`);
      setRequests((prev) =>
        prev.map((req) =>
          req._id === id ? { ...req, requestStatus: "rejected" } : req
        )
      );
      toast.error("Request rejected");
    } catch (err) {
      console.error(err);
      toast.error("Failed to reject request");
    }
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
                <tr
                  key={req._id}
                  className="border-b hover:bg-gray-50 text-sm text-center"
                >
                  <td className="p-3 font-medium">{req.requesterName}</td>
                  <td className="p-3">{req.assetName}</td>
                  <td className="p-3">
                    {new Date(req.requestDate).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        req.requestStatus === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : req.requestStatus === "approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {req.requestStatus.charAt(0).toUpperCase() +
                        req.requestStatus.slice(1)}
                    </span>
                  </td>
                  <td className="p-3 text-center space-x-2">
                    {req.requestStatus === "pending" ? (
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
                    ) : (
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
