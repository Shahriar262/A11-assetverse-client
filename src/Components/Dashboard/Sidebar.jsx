import React from "react";
import { Link } from "react-router";

const Sidebar = ({ user }) => {
  // user.role = "hr" | "employee"
  const employeeLinks = [
    { name: "My Assets", to: "/dashboard/my-assets" },
    { name: "Request Asset", to: "/dashboard/request-asset" },
    { name: "My Team", to: "/dashboard/my-team" },
    { name: "Profile", to: "/dashboard/profile" },
  ];

  const hrLinks = [
    { name: "Asset List", to: "/dashboard/asset-list" },
    { name: "Add Asset", to: "/dashboard/add-asset" },
    { name: "All Requests", to: "/dashboard/all-requests" },
    { name: "My Employee List", to: "/dashboard/employee-list" },
    { name: "Upgrade Package", to: "/dashboard/upgrade-package" },
    { name: "HRProfile", to: "/dashboard/hr-profile" },
  ];

  const links = user?.role === "hr" ? hrLinks : employeeLinks;

  return (
    <aside className="w-64 bg-indigo-600 text-white flex-shrink-0">
      <Link
        to="/"
        className="h-16 flex items-center justify-center font-bold text-lg border-b border-indigo-500"
      >
        AssetVerse
      </Link>
      <nav className="p-4">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                className="block px-3 py-2 rounded hover:bg-indigo-500"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
