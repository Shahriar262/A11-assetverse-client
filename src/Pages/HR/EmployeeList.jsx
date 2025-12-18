import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [employeeLimit, setEmployeeLimit] = useState({ used: 3, total: 5 });

  useEffect(() => {
    // Mock employee data
    const demoEmployees = [
      {
        _id: "emp1",
        name: "John Doe",
        email: "john@example.com",
        photo: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
        joinDate: "2024-01-10",
        assetsCount: 2,
      },
      {
        _id: "emp2",
        name: "Jane Smith",
        email: "jane@example.com",
        photo: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
        joinDate: "2024-02-05",
        assetsCount: 1,
      },
      {
        _id: "emp3",
        name: "Mike Johnson",
        email: "mike@example.com",
        photo: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
        joinDate: "2024-03-01",
        assetsCount: 3,
      },
    ];
    setEmployees(demoEmployees);
  }, []);

  const handleRemove = (id) => {
    const confirm = window.confirm(
      "Are you sure you want to remove this employee from your team?"
    );
    if (!confirm) return;

    // Backend API call to remove employee from team
    setEmployees((prev) => prev.filter((emp) => emp._id !== id));
    toast.success("Employee removed from team");

    // Decrement used employee count
    setEmployeeLimit((prev) => ({ ...prev, used: prev.used - 1 }));
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
                src={emp.photo}
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
