import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { format } from "date-fns";

const MyTeam = () => {
  const { user } = useAuth();
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [employees, setEmployees] = useState([]);

  // Mock data: you can replace with API call
  const allEmployees = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      position: "Developer",
      company: "TechSoft Ltd",
      photo: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
      dob: "1995-12-20",
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob@example.com",
      position: "Designer",
      company: "TechSoft Ltd",
      photo: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
      dob: "1990-12-05",
    },
    {
      id: 3,
      name: "Charlie Brown",
      email: "charlie@example.com",
      position: "Manager",
      company: "Innova Corp",
      photo: "https://i.ibb.co/ZYW3VTp/brown-brim.png",
      dob: "1988-07-15",
    },
  ];

  useEffect(() => {
    // Get unique companies for tabs/dropdown
    const companyList = [...new Set(allEmployees.map((e) => e.company))];
    setCompanies(companyList);

    if (companyList.length > 0) {
      setSelectedCompany(companyList[0]);
    }
  }, []);

  useEffect(() => {
    // Filter employees based on selected company
    const filtered = allEmployees.filter(
      (emp) => emp.company === selectedCompany
    );
    setEmployees(filtered);
  }, [selectedCompany]);

  // Get upcoming birthdays in current month
  const currentMonth = new Date().getMonth() + 1; // Jan=0
  const upcomingBirthdays = allEmployees.filter(
    (emp) => new Date(emp.dob).getMonth() + 1 === currentMonth
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">My Team</h2>

      {/* Company Selection */}
      <div className="mb-6">
        <label className="block mb-2 font-medium">Select Company</label>
        <select
          value={selectedCompany}
          onChange={(e) => setSelectedCompany(e.target.value)}
          className="border rounded-md p-2 w-full max-w-xs"
        >
          {companies.map((company, idx) => (
            <option key={idx} value={company}>
              {company}
            </option>
          ))}
        </select>
      </div>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {employees.map((emp) => (
          <div
            key={emp.id}
            className="bg-white p-4 rounded-lg shadow flex flex-col items-center text-center"
          >
            <img
              src={emp.photo}
              alt={emp.name}
              className="w-20 h-20 rounded-full object-cover mb-2"
            />
            <h3 className="font-semibold">{emp.name}</h3>
            <p className="text-gray-500 text-sm">{emp.position}</p>
            <p className="text-gray-400 text-xs">{emp.email}</p>
          </div>
        ))}
      </div>

      {/* Upcoming Birthdays */}
      {upcomingBirthdays.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Upcoming Birthdays</h3>
          <ul className="space-y-2">
            {upcomingBirthdays.map((emp) => (
              <li key={emp.id} className="flex justify-between">
                <span>
                  {emp.name} ({emp.position})
                </span>
                <span className="text-gray-500">
                  {format(new Date(emp.dob), "dd MMM")}
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
