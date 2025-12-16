import { createBrowserRouter, Navigate } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Public/Home";
import Login from "../Pages/Public/Login";
import RegisterEmployee from "../Pages/Public/RegisterEmployee";
import RegisterHR from "../Pages/Public/RegisterHR";
import DashboardLayout from "../Layouts/DashboardLayout";
import RequestAsset from "../Pages/Employee/RequestAsset";
import MyAssets from "../Pages/Employee/MyAssets";
import MyTeam from "../Pages/Employee/MyTeam";
import Profile from "../Pages/Employee/Profile";
import AssetList from "../Pages/HR/AssetList";
import AddAsset from "../Pages/HR/AddAsset";
import AllRequests from "../Pages/HR/AllRequests";
import EmployeeList from "../Pages/HR/EmployeeList";
import UpgradePackage from "../Pages/HR/UpgradePackage";
import HRProfile from "../Pages/HR/HRProfile";

export const router = createBrowserRouter([
  /* ================= PUBLIC ROUTES ================= */
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register-employee", element: <RegisterEmployee /> },
      { path: "register-hr", element: <RegisterHR /> },
    ],
  },

  /* ================= DASHBOARD ROUTES ================= */
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      /* ---- DEFAULT DASHBOARD REDIRECT ---- */
      {
        index: true,
        element: <Navigate to="my-assets" />,
      },

      /* ===== EMPLOYEE DASHBOARD ===== */
      {
        path: "my-assets",
        element: <MyAssets />,
      },
      {
        path: "request-asset",
        element: <RequestAsset />,
      },
      {
        path: "my-team",
        element: <MyTeam />,
      },
      {
        path: "profile",
        element: <Profile />,
      },

      /* ===== HR DASHBOARD ===== */
      {
        path: "asset-list",
        element: <AssetList />,
      },
      {
        path: "add-asset",
        element: <AddAsset />,
      },
      {
        path: "all-requests",
        element: <AllRequests />,
      },
      {
        path: "employee-list",
        element: <EmployeeList />,
      },
      {
        path: "upgrade-package",
        element: <UpgradePackage />,
      },
      {
        path: "hr-profile",
        element: <HRProfile />,
      },
    ],
  },
]);
