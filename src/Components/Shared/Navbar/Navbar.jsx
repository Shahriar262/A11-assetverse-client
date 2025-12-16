import { Link } from "react-router";

const Navbar = ({ user }) => {
  const employeeMenu = (
    <>
      <li>
        <Link to="/dashboard/my-assets" className="hover:text-indigo-600">
          My Assets
        </Link>
      </li>
      <li>
        <Link to="/dashboard/request-asset" className="hover:text-indigo-600">
          Request Asset
        </Link>
      </li>
      <li>
        <Link to="/dashboard/my-team" className="hover:text-indigo-600">
          My Team
        </Link>
      </li>
      <li>
        <Link to="/dashboard/profile" className="hover:text-indigo-600">
          Profile
        </Link>
      </li>
      <li>
        <button className="hover:text-indigo-600">Logout</button>
      </li>
    </>
  );

  const hrMenu = (
    <>
      <li>
        <Link to="/dashboard/asset-list" className="hover:text-indigo-600">
          Asset List
        </Link>
      </li>
      <li>
        <Link to="/dashboard/add-asset" className="hover:text-indigo-600">
          Add Asset
        </Link>
      </li>
      <li>
        <Link to="/dashboard/all-requests" className="hover:text-indigo-600">
          All Requests
        </Link>
      </li>
      <li>
        <Link to="/dashboard/employee-list" className="hover:text-indigo-600">
          My Employee List
        </Link>
      </li>
      <li>
        <Link to="/dashboard/upgrade-package" className="hover:text-indigo-600">
          Upgrade Package
        </Link>
      </li>
      <li>
        <Link to="/dashboard/hr-profile" className="hover:text-indigo-600">
          Profile
        </Link>
      </li>
      <li>
        <button className="hover:text-indigo-600">Logout</button>
      </li>
    </>
  );

  const publicMenu = (
    <>
      <li>
        <Link to="/" className="hover:text-indigo-600">
          Home
        </Link>
      </li>
      <li>
        <Link to="/register-employee" className="hover:text-indigo-600">
          Join as Employee
        </Link>
      </li>
      <li>
        <Link to="/register-hr" className="hover:text-indigo-600">
          Join as HR Manager
        </Link>
      </li>
    </>
  );

  return (
    <div className="navbar bg-white shadow-sm">
      <div className="navbar max-w-7xl mx-auto px-7">
        {/* Navbar Start */}
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
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52"
            >
              {user ? (user.role === "hr" ? hrMenu : employeeMenu) : publicMenu}
            </ul>
          </div>

          {/* Logo */}
          <Link
            to="/"
            className="btn btn-ghost text-xl font-bold text-indigo-600 normal-case"
          >
            AssetVerse
          </Link>
        </div>

        {/* Navbar Center */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {user ? (user.role === "hr" ? hrMenu : employeeMenu) : publicMenu}
          </ul>
        </div>

        {/* Navbar End */}
        <div className="navbar-end">
          {!user && (
            <Link
              to="/login"
              className="btn btn-sm bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Login
            </Link>
          )}

          {user && (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-indigo-600 ring-offset-2">
                  <img
                    src={user.profileImage || "/default-avatar.png"}
                    alt="profile"
                  />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white rounded-box w-52"
              >
                {user.role === "hr" ? hrMenu : employeeMenu}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
