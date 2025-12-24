import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { TbFidgetSpinner } from "react-icons/tb";

const AllRequests = () => {
  const axiosSecure = useAxiosSecure();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const { data } = await axiosSecure.get("/requests/all");
        setRequests(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch requests");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [axiosSecure]);

  const handleApprove = async (id) => {
    if (!window.confirm("Approve this request?")) return;
    try {
      await axiosSecure.patch(`/requests/${id}/approve`);
      setRequests((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, requestStatus: "approved" } : r
        )
      );
      toast.success("Request approved");
    } catch (err) {
      console.error(err);
      toast.error("Approval failed");
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm("Reject this request?")) return;
    try {
      await axiosSecure.patch(`/requests/${id}/reject`);
      setRequests((prev) =>
        prev.map((r) =>
          r._id === id ? { ...r, requestStatus: "rejected" } : r
        )
      );
      toast.success("Request rejected");
    } catch (err) {
      console.error(err);
      toast.error("Rejection failed");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <TbFidgetSpinner className="animate-spin text-4xl text-indigo-600" />
      </div>
    );

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Employee Requests</h2>

      {requests.length === 0 ? (
        <p className="text-gray-500">No requests found.</p>
      ) : (
        <>
          
          <div className="hidden sm:block">
            <table className="w-full border-collapse border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">Asset Image</th>
                  <th className="border px-4 py-2">Employee</th>
                  <th className="border px-4 py-2">Request Date</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((req) => (
                  <tr key={req._id} className="text-center">
                    <td className="border px-4 py-2">
                      <img
                        src={req.assetImage || "https://via.placeholder.com/50"}
                        className="w-12 h-12 mx-auto rounded object-cover"
                      />
                    </td>
                    <td className="border px-4 py-2">{req.requesterName}</td>
                    <td className="border px-4 py-2">
                      {new Date(req.requestDate).toLocaleDateString()}
                    </td>
                    <td
                      className={`border px-4 py-2 font-semibold capitalize ${
                        req.requestStatus === "pending"
                          ? "text-yellow-600"
                          : req.requestStatus === "approved"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {req.requestStatus}
                    </td>
                    <td className="border px-4 py-2 space-x-2">
                      {req.requestStatus === "pending" && (
                        <>
                          <button
                            onClick={() => handleApprove(req._id)}
                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => handleReject(req._id)}
                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        
          <div className="sm:hidden space-y-4">
            {requests.map((req) => (
              <div key={req._id} className="border rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={req.assetImage || "https://via.placeholder.com/50"}
                    className="w-14 h-14 rounded object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{req.requesterName}</h3>
                    <p className="text-xs text-gray-500">
                      {new Date(req.requestDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <p
                  className={`text-sm font-semibold capitalize mb-3 ${
                    req.requestStatus === "pending"
                      ? "text-yellow-600"
                      : req.requestStatus === "approved"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Status: {req.requestStatus}
                </p>

                {req.requestStatus === "pending" && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleApprove(req._id)}
                      className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(req._id)}
                      className="flex-1 bg-red-500 text-white py-2 rounded hover:bg-red-600"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllRequests;
