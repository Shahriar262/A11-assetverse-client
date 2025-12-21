import { useEffect, useState } from "react";
import { format } from "date-fns";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyTeam = () => {
  const axiosSecure = useAxiosSecure();
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [employees, setEmployees] = useState([]);

  // Fetch all companies where the HR has active employees
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const { data } = await axiosSecure.get("/employee/companies");
        setCompanies(data);
        if (data.length > 0) setSelectedCompany(data[0].companyName);
      } catch (err) {
        console.error("Failed to fetch companies:", err);
      }
    };
    fetchCompanies();
  }, [axiosSecure]);

  // Fetch employees for selected company (only active affiliations)
  useEffect(() => {
    if (!selectedCompany) return;
    const fetchTeam = async () => {
      try {
        const { data } = await axiosSecure.get(
          `/employee/team?companyName=${selectedCompany}`
        );
        // Filter only active affiliations
        const activeEmployees = data.filter(
          (emp) => emp.affiliationStatus === "active"
        );
        setEmployees(activeEmployees);
      } catch (err) {
        console.error("Failed to fetch team:", err);
      }
    };
    fetchTeam();
  }, [selectedCompany, axiosSecure]);

  // Upcoming birthdays in the current month
  const currentMonth = new Date().getMonth();
  const upcomingBirthdays = employees.filter(
    (emp) =>
      emp.dateOfBirth && new Date(emp.dateOfBirth).getMonth() === currentMonth
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">My Team</h2>

      {/* Company dropdown */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Select Company</label>
        <select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          className="border rounded-md p-2 w-full max-w-xs"
        >
          {companies.map((c, idx) => (
            <option key={idx} value={c.companyName}>
              {c.companyName}
            </option>
          ))}
        </select>
      </div>

      {/* Employee cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {employees.length === 0 && (
          <p className="text-gray-500 col-span-full">No employees found.</p>
        )}
        {employees.map((emp) => (
          <div
            key={emp.employeeEmail}
            className="bg-white p-4 rounded-lg shadow flex flex-col items-center text-center"
          >
            <img
              src={emp.profileImage || "https://i.ibb.co/2kRZ5q0/user.png"}
              alt={emp.employeeName}
              className="w-20 h-20 rounded-full object-cover mb-2"
            />
            <h3 className="font-semibold">{emp.employeeName}</h3>
            <p className="text-gray-400 text-sm">{emp.employeeEmail}</p>
            <p className="text-gray-600 text-sm">{emp.position || "-"}</p>
          </div>
        ))}
      </div>

      {/* Upcoming Birthdays */}
      {upcomingBirthdays.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Upcoming Birthdays</h3>
          <ul className="space-y-2">
            {upcomingBirthdays.map((emp) => (
              <li key={emp.employeeEmail} className="flex justify-between">
                <span>{emp.employeeName}</span>
                <span className="text-gray-500">
                  {format(new Date(emp.dateOfBirth), "dd MMM")}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MyTeam;
