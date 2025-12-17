import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "./useAuth";

const useRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axios.get(`/user/${user?.email}/role`).then((res) => {
      setRole(res.data.role);
      setStatus(res.data.status);
      setLoading(false);
    });
  }, [user?.email]);

  return { role, status, loading };
};

export default useRole;
