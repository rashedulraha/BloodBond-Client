import useAxiosSecure from "@/Hook/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { AllUser } from "@/types/blog";

const AllRegisterUser = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [] } = useQuery({
    queryKey: ["register-user"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/register-user`);
      return res.data;
    },
  });
  return (
    <div>
      <h1>All user {users.length}</h1>

      <Table>
        <TableCaption>A list of all users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">User profile </TableHead>
            <TableHead className="w-[100px]">User name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Blood Group</TableHead>
            <TableHead>Division</TableHead>
            <TableHead>District</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: AllUser) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium">
                <figure className="w-10 h-10 rounded-full border border-primary overflow-hidden">
                  <img src={user.imageURL} alt={user.name} />
                </figure>
              </TableCell>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell className="font-medium">{user.email}</TableCell>
              <TableCell>{user.bloodGroup}</TableCell>
              <TableCell>{user.division}</TableCell>
              <TableCell className="text-right">{user.district}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllRegisterUser;
