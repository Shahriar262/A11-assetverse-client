import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { TbFidgetSpinner } from "react-icons/tb";

const EmployeeList = () => {
  const axiosSecure = useAxiosSecure();
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({ currentEmployees: 0, packageLimit: 0 });

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await axiosSecure.get("/employees/my");
        setEmployees(data.employees);
        setInfo({
          currentEmployees: data.currentEmployees,
          packageLimit: data.packageLimit,
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch employees");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, [axiosSecure]);

  const handleRemove = async (email) => {
    if (!window.confirm("Remove this employee?")) return;
    try {
      await axiosSecure.patch(`/employees/${email}/remove`);
      setEmployees((prev) => prev.filter((e) => e.employeeEmail !== email));
      setInfo((prev) => ({
        ...prev,
        currentEmployees: prev.currentEmployees - 1,
      }));
      toast.success("Employee removed from team");
    } catch (err) {
      console.error(err);
      toast.error("Failed to remove employee");
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
      <h2 className="text-2xl font-semibold mb-2">My Employees</h2>
      <p className="mb-4 text-sm text-gray-600">
        {info.currentEmployees}/{info.packageLimit} employees used
      </p>

      {employees.length === 0 ? (
        <p className="text-gray-500">No employees found.</p>
      ) : (
        <>
        
          <div className="hidden sm:block">
            <table className="w-full border-collapse border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2">Photo</th>
                  <th className="border px-4 py-2">Name</th>
                  <th className="border px-4 py-2">Email</th>
                  <th className="border px-4 py-2">Join Date</th>
                  <th className="border px-4 py-2">Assets</th>
                  <th className="border px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((emp) => (
                  <tr key={emp.employeeEmail}>
                    <td className="border px-4 py-2">
                      <img
                        src={
                          emp.profileImage ||
                          "https://i.ibb.co/2kRZ5q0/user.png"
                        }
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    </td>
                    <td className="border px-4 py-2">{emp.employeeName}</td>
                    <td className="border px-4 py-2">{emp.employeeEmail}</td>
                    <td className="border px-4 py-2">
                      {new Date(emp.affiliationDate).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2">{emp.assetsCount || 0}</td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleRemove(emp.employeeEmail)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        
          <div className="sm:hidden space-y-4">
            {employees.map((emp) => (
              <div
                key={emp.employeeEmail}
                className="border rounded-lg p-4 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={
                      emp.profileImage || "https://i.ibb.co/2kRZ5q0/user.png"
                    }
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{emp.employeeName}</h3>
                    <p className="text-xs text-gray-500 break-all">
                      {emp.employeeEmail}
                    </p>
                  </div>
                </div>

                <div className="text-sm space-y-1">
                  <p>
                    <span className="font-medium">Join Date:</span>{" "}
                    {new Date(emp.affiliationDate).toLocaleDateString()}
                  </p>
                  <p>
                    <span className="font-medium">Assets:</span>{" "}
                    {emp.assetsCount || 0}
                  </p>
                </div>

                <button
                  onClick={() => handleRemove(emp.employeeEmail)}
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                >
                  Remove Employee
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeList;
