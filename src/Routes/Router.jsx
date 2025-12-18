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
import AssetList from "../Pages/HR/AssetList";
import AddAsset from "../Pages/HR/AddAsset";
import AllRequests from "../Pages/HR/AllRequests";
import EmployeeList from "../Pages/HR/EmployeeList";
import UpgradePackage from "../Pages/HR/UpgradePackage";
import PrivateRoute from "./PrivateRoute";
import DashboardRedirect from "../Pages/Dashboard/DashboardRedirect";
import Profile from "../Pages/Dashboard/Profile";

export const router = createBrowserRouter([
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

  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // Default redirect inside dashboard
      { index: true, element: <DashboardRedirect /> },

      // Shared Profile (HR + Employee)
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },

      // Employee Dashboard
      {
        path: "my-assets",
        element: (
          <PrivateRoute role="employee">
            <MyAssets />
          </PrivateRoute>
        ),
      },
      {
        path: "request-asset",
        element: (
          <PrivateRoute role="employee">
            <RequestAsset />
          </PrivateRoute>
        ),
      },
      {
        path: "my-team",
        element: (
          <PrivateRoute role="employee">
            <MyTeam />
          </PrivateRoute>
        ),
      },

      // HR Dashboard
      {
        path: "asset-list",
        element: (
          <PrivateRoute role="hr">
            <AssetList />
          </PrivateRoute>
        ),
      },
      {
        path: "add-asset",
        element: (
          <PrivateRoute role="hr">
            <AddAsset />
          </PrivateRoute>
        ),
      },
      {
        path: "all-requests",
        element: (
          <PrivateRoute role="hr">
            <AllRequests />
          </PrivateRoute>
        ),
      },
      {
        path: "employee-list",
        element: (
          <PrivateRoute role="hr">
            <EmployeeList />
          </PrivateRoute>
        ),
      },
      {
        path: "upgrade-package",
        element: (
          <PrivateRoute role="hr">
            <UpgradePackage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
