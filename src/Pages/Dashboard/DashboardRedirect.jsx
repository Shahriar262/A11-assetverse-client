import { useEffect } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";


const DashboardRedirect = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "hr") {
      navigate("asset-list", { replace: true });
    } else if (user?.role === "employee") {
      navigate("my-assets", { replace: true });
    }
  }, [user, navigate]);

  return null; 
};

export default DashboardRedirect;
