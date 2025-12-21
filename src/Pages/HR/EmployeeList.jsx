import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const EmployeeList = () => {
  const axiosSecure = useAxiosSecure();
  const [employees, setEmployees] = useState([]);
  const [employeeLimit, setEmployeeLimit] = useState({ used: 0, total: 0 });

  useEffect(() => {
    const fetchLimit = async () => {
      try {
        const res = await axiosSecure.get("/employee/limit");
        setEmployeeLimit(res.data); 
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch employee limit");
      }
    };
    fetchLimit();
  }, [axiosSecure]);

  // Fetch employees
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axiosSecure.get("/employee/team");
        setEmployees(res.data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch employees");
      }
    };
    fetchEmployees();
  }, [axiosSecure]);

  const handleRemove = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to remove this employee from your team?"
    );
    if (!confirmDelete) return;

    try {
      await axiosSecure.delete(`/employee/remove/${id}`); 
      setEmployees((prev) => prev.filter((emp) => emp._id !== id));
      setEmployeeLimit((prev) => ({ ...prev, used: prev.used - 1 }));
      toast.success("Employee removed from team");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove employee");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">My Employees</h2>

      <p className="mb-4 text-gray-600">
        Employee count: {employeeLimit.used}/{employeeLimit.total} used
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.length === 0 ? (
          <p className="text-gray-500 col-span-full">No employees found.</p>
        ) : (
          employees.map((emp) => (
            <div
              key={emp._id}
              className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow-sm"
            >
              <img
                src={emp.photo || "https://i.ibb.co/2kRZ5q0/user.png"}
                alt={emp.name}
                className="w-20 h-20 rounded-full object-cover mb-3"
              />
              <h3 className="font-semibold text-lg">{emp.name}</h3>
              <p className="text-gray-500 text-sm">{emp.email}</p>
              <p className="text-gray-500 text-sm">
                Joined: {new Date(emp.joinDate).toLocaleDateString()}
              </p>
              <p className="text-gray-500 text-sm">Assets: {emp.assetsCount}</p>

              <button
                onClick={() => handleRemove(emp._id)}
                className="mt-3 px-4 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600 transition"
              >
                Remove from Team
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default EmployeeList;
