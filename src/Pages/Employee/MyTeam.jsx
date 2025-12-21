import { useEffect, useState } from "react";
import { format } from "date-fns";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { imgUpload } from "../../utils";

const MyTeam = () => {
  const axiosSecure = useAxiosSecure();
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [employees, setEmployees] = useState([]);

  // Load affiliated companies
  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const res = await axiosSecure.get("/employee/companies");
        setCompanies(res.data);

        if (res.data.length > 0) {
          setSelectedCompany(res.data[0].companyName);
        }
      } catch (err) {
        console.error(err);
      }
    };

    loadCompanies();
  }, [axiosSecure]);

  // Load team members when company changes
  useEffect(() => {
    if (!selectedCompany) return;

    const loadTeam = async () => {
      try {
        const res = await axiosSecure.get(
          `/employee/team?companyName=${selectedCompany}`
        );

        const employeesWithImages = await Promise.all(
          res.data.map(async (emp) => {
            if (!emp.profileImage && emp.localImageFile) {
              const uploadedUrl = await imgUpload(emp.localImageFile);
              emp.profileImage = uploadedUrl;
            } else if (!emp.profileImage) {
              emp.profileImage = "https://i.ibb.co/2kRZ5q0/user.png";
            }
            return emp;
          })
        );

        setEmployees(employeesWithImages);
      } catch (err) {
        console.error(err);
      }
    };

    loadTeam();
  }, [selectedCompany, axiosSecure]);

  // Birthdays (current month)
  const currentMonth = new Date().getMonth();
  const upcomingBirthdays = employees.filter(
    (emp) =>
      emp.dateOfBirth && new Date(emp.dateOfBirth).getMonth() === currentMonth
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-6">My Team</h2>

      {/* Company selector */}
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

      {/* Team grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {employees.map((emp) => (
          <div
            key={emp.email}
            className="bg-white p-4 rounded-lg shadow flex flex-col items-center text-center"
          >
            <img
              src={emp.profileImage || "https://i.ibb.co/2kRZ5q0/user.png"} 
              alt={emp.name}
              className="w-20 h-20 rounded-full object-cover mb-2"
            />
            <h3 className="font-semibold">{emp.name}</h3>
            <p className="text-gray-400 text-sm">{emp.email}</p>
          </div>
        ))}
      </div>

      {/* Birthdays */}
      {upcomingBirthdays.length > 0 && (
        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-4">Upcoming Birthdays</h3>
          <ul className="space-y-2">
            {upcomingBirthdays.map((emp) => (
              <li key={emp.email} className="flex justify-between">
                <span>{emp.name}</span>
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
