import { createBrowserRouter } from "react-router";
import MainLayout from "../Layouts/MainLayout";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Public/Home";
import Login from "../Pages/Public/Login";
import RegisterEmployee from "../Pages/Public/RegisterEmployee";
import RegisterHR from "../Pages/Public/RegisterHR";




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
  }
])