import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "./useAuth";

const useRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:3000/user/${user.email}/role`)
      .then((res) => {
        setRole(res.data?.role);
        setStatus(res.data?.status);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user?.email]);

  return { role, status, loading };
};

export default useRole;
