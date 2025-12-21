// src/components/Sidebar/Sidebar.jsx
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const Sidebar = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const [role, roleLoading] = useRole();

  const handleLogout = async () => {
    await logOut();
    navigate("/");
  };

  if (roleLoading) return null; // loading হলে কিছু দেখাবে না

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
    { name: "Employee List", to: "/dashboard/employee-list" },
    { name: "Upgrade Package", to: "/dashboard/upgrade-package" },
    { name: "Profile", to: "/dashboard/profile" },
  ];

  const links = role === "hr" ? hrLinks : employeeLinks;

  return (
    <aside className="w-64 bg-indigo-600 text-white flex flex-col min-h-screen">
      {/* Logo */}
      <Link to='/' className="h-16 flex items-center justify-center font-bold text-xl border-b border-indigo-500">
        AssetVerse
      </Link>

      {/* Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded transition ${
                    isActive ? "bg-indigo-800" : "hover:bg-indigo-500"
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-indigo-500">
        <button
          onClick={handleLogout}
          className="w-full bg-white text-black py-2 rounded hover:bg-gray-200"
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
