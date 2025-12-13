import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

interface UseRoleResult {
  role: string | null;
  isLoading: boolean;
  isError: boolean;
  error: unknown;
}

const useRole = (): UseRoleResult => {
  const axiosSecure = useAxiosSecure();
  const { user, loading } = useAuth();

  const {
    data: roleData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["userRole", user?.email],

    queryFn: async () => {
      if (!user?.email) {
        throw new Error("User email not available for role query.");
      }

      const res = await axiosSecure.get(`/user/${user.email}/role`);
      return res.data;
    },

    enabled: !!user?.email && !loading,

    staleTime: 1000 * 60 * 5,
  });

  const userRole: string | null = roleData?.role || null;

  return {
    role: userRole,
    isLoading,
    isError,
    error,
  };
};

export default useRole;
