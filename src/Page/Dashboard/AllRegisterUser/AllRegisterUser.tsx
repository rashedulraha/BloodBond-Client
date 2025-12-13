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

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { AllUser } from "@/types/blog";
import { Button } from "@/components/ui/button";

const AllRegisterUser = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["register-user"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/register-user`);
      return res.data;
    },
  });

  //! block and unblock user
  const handleToggleUserStatus = (_id: string, status: string) => {
    const userInformation = {
      id: _id,
      status,
    };
    axiosSecure.patch(`register-user`, userInformation).then(() => {
      refetch();
    });
  };

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
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: AllUser) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium capitalize">
                <figure className="w-10 h-10 rounded-full border border-primary overflow-hidden">
                  <img src={user.imageURL} alt={user.name} />
                </figure>
              </TableCell>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell className="font-medium">{user.email}</TableCell>
              <TableCell>{user.bloodGroup}</TableCell>
              <TableCell>{user.division}</TableCell>
              <TableCell className="text-right">{user.district}</TableCell>
              <TableCell
                className={
                  user.status === "active"
                    ? "text-green-400 capitalize"
                    : "text-red-500 capitalize"
                }>
                {user.status}
              </TableCell>
              <TableCell>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline">Change Status</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        {user.status === "block"
                          ? "This action will restore the user's access to the system. They will be able to log in and use all features again."
                          : "This action will block the user from accessing the system. They will not be able to log in or perform any actions until unblocked."}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      {user.status === "block" ? (
                        <AlertDialogAction
                          onClick={() =>
                            handleToggleUserStatus(`${user._id}`, "active")
                          }>
                          Unblock
                        </AlertDialogAction>
                      ) : (
                        <AlertDialogAction
                          onClick={() =>
                            handleToggleUserStatus(`${user._id}`, "block")
                          }>
                          Block
                        </AlertDialogAction>
                      )}
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllRegisterUser;
