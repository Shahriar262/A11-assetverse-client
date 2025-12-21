import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const [role, roleLoading] = useRole();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    navigate("/", { replace: true });
  };

  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
        {/* LOGO */}
        <Link to="/" className="text-2xl font-extrabold text-indigo-600">
          AssetVerse
        </Link>

        {/* PUBLIC LINKS */}
        {!user && (
          <div className="flex gap-2">
            <NavLink to="/" className="btn btn-ghost btn-sm">
              Home
            </NavLink>
            <NavLink to="/register-employee" className="btn btn-ghost btn-sm">
              Join as Employee
            </NavLink>
            <NavLink to="/register-hr" className="btn btn-ghost btn-sm">
              Join as HR Manager
            </NavLink>
            <NavLink to="/login" className="btn btn-primary btn-sm">
              Login
            </NavLink>
          </div>
        )}

        {/* USER DROPDOWN */}
        {user && !roleLoading && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-9 rounded-full">
                <img
                  src={user.photoURL || "https://i.ibb.co/2kRZ5q0/user.png"}
                  alt="profile"
                />
              </div>
            </label>

            <ul className="menu menu-sm dropdown-content mt-3 z-[99] p-2 shadow bg-base-100 rounded-box w-52">
              {role === "employee" && (
                <>
                  <li>
                    <NavLink to="/dashboard/my-assets">My Assets</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/my-team">My Team</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/request-asset">
                      Request Asset
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/profile">Profile</NavLink>
                  </li>
                </>
              )}

              {role === "hr" && (
                <>
                  <li>
                    <NavLink to="/dashboard/asset-list">Asset List</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/add-asset">Add Asset</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/all-requests">All Requests</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/employee-list">
                      Employee List
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/upgrade-package">
                      Upgrade Package
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/dashboard/profile">Profile</NavLink>
                  </li>
                </>
              )}

              <li className="border-t mt-1">
                <button
                  onClick={handleLogout}
                  className="text-error w-full text-left"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
