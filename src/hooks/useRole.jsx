import { useState, useEffect } from "react";
import useAuth from "./useAuth";
import axios from "axios";

const useRole = () => {
  const { user, loading } = useAuth();
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setRole(null);
      setRoleLoading(false);
      return;
    }

    const fetchRole = async () => {
      setRoleLoading(true);
      try {
        const token = await user.getIdToken(true);
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/role`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setRole(res.data.role); // "employee" or "hr"
      } catch (err) {
        console.error("Failed to fetch role", err);
        setRole(null);
      } finally {
        setRoleLoading(false);
      }
    };

    fetchRole();
  }, [user]);

  return [role, roleLoading];
};

export default useRole;
