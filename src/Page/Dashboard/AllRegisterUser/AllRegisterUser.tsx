import useAxiosSecure from "@/Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AllRegisterUser = () => {
  const axiosSecure = useAxiosSecure();
  const { data: user = [] } = useQuery({
    queryKey: ["register-user"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/register-user`);
      return res.data;
    },
  });
  return (
    <div>
      <h1>All user {user.length}</h1>
    </div>
  );
};

export default AllRegisterUser;
