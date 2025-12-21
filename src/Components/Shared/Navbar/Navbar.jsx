import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, role, loading, logOut } = useAuth();
  const navigate = useNavigate();

  if (loading) return null;

  const handleLogout = async () => {
    await logOut();
    navigate("/");
  };

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="w-full max-w-7xl mx-auto flex justify-between items-center px-4">
      {/* ========== START ========== */}
      
      <div className="navbar-start">
        
        {/* Mobile Dropdown */}
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>

            {!user && (
              <>
                <li>
                  <NavLink to="/register/employee">Join as Employee</NavLink>
                </li>
                <li>
                  <NavLink to="/register/hr">Join as HR Manager</NavLink>
                </li>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Logo */}
        <Link to="/" className="text-indigo-600 text-xl font-bold">
          AssetVerse
        </Link>
      </div>

      {/* ========== CENTER (Desktop Menu) ========== */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>

          {!user && (
            <>
              <li>
                <NavLink to="/register-employee">Join as Employee</NavLink>
              </li>
              <li>
                <NavLink to="/register-hr">Join as HR Manager</NavLink>
              </li>
            </>
          )}
        </ul>
      </div>

      {/* ========== END ========== */}
      <div className="navbar-end">
        {!user && (
          <NavLink to="/login" className="btn btn-primary btn-sm">
            Login
          </NavLink>
        )}

        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-9 rounded-full">
                <img
                  src={user.photoURL || "https://i.ibb.co/2kRZ5q0/user.png"}
                  alt="profile"
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-56 p-2 shadow"
            >
              {/* ===== HR ===== */}
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
                </>
              )}

              {/* ===== EMPLOYEE ===== */}
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
                </>
              )}

              <li className="border-t mt-2">
                <NavLink to="/profile">Profile</NavLink>
              </li>
              <li>
                <button onClick={handleLogout} className="text-error">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      </div>
    </div>
  );
};

export default Navbar;
