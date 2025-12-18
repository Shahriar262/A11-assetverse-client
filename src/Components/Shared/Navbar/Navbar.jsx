import { Link, NavLink } from "react-router";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const role = user?.role || "employee";

  const publicLinks = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/register-employee">Join as Employee</NavLink>
      </li>
      <li>
        <NavLink to="/register-hr">Join as HR Manager</NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-sm px-4">
      <div className="max-w-7xl mx-auto w-full px-4 flex items-center">
        {/* LEFT */}
        <div className="navbar-start">
          {/* Mobile Menu */}
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
            </label>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {!user && publicLinks}

              {user && role === "employee" && (
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
                  <li>
                    <button onClick={logOut} className="text-error">
                      Logout
                    </button>
                  </li>
                </>
              )}

              {user && role === "hr" && (
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
                    <NavLink to="/dashboard/hr-profile">Profile</NavLink>
                  </li>
                  <li>
                    <button onClick={logOut} className="text-error">
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* Logo */}
          <Link
            to="/"
            className="btn btn-ghost text-xl font-bold text-indigo-600"
          >
            AssetVerse
          </Link>
        </div>

        {/* CENTER (Desktop Menu) */}
        <div className="navbar-center hidden lg:flex">
          {!user && (
            <ul className="menu menu-horizontal px-1 gap-2">{publicLinks}</ul>
          )}
        </div>

        {/* RIGHT */}
        <div className="navbar-end">
          {!user && (
            <Link to="/login" className="btn btn-primary btn-sm">
              Login
            </Link>
          )}

          {user && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-9 rounded-full">
                  <img
                    src={user.photoURL || "https://i.ibb.co/2kRZ5q0/user.png"}
                    alt="profile"
                  />
                </div>
              </label>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
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
                      <NavLink to="/dashboard/all-requests">
                        All Requests
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/employee-list">
                        Employee List
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/dashboard/hr-profile">Profile</NavLink>
                    </li>
                  </>
                )}

                <li className="border-t mt-1">
                  <button onClick={logOut} className="text-error">
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
