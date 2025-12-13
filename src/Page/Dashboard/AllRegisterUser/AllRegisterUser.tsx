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
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import type { AllUser } from "@/types/blog";
import { Button } from "@/components/ui/button";
import { Search, Users } from "lucide-react";

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

  const handleToggleUserRole = (_id: string, userRole: string) => {
    const userInfo = {
      id: _id,
      role: userRole,
    };

    console.log(userInfo);
  };

  return (
    <div>
      <div className="flex items-center justify-between pb-5">
        <div>
          <header className="max-w-7xl mx-auto mb-8">
            <h1 className="text-4xl font-extrabold text-foreground flex items-center capitalize">
              <Users className="w-8 h-8 mr-3 text-primary" />
              all registered user
            </h1>
            <p className="mt-1  text-md sm:text-lg md:text-lg  text-muted-foreground mb-8 max-w-4xl lg:max-w-4xl mx-auto px-4">
              Manage registered users, including blocking or unblocking access
              when needed.
            </p>
          </header>
        </div>
        <div>
          <InputGroup>
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end">
              {users?.length} results
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>

      <Table>
        <TableCaption>A list of all users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">User profile </TableHead>
            <TableHead className="w-[100px]">User name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
            <TableHead>Authorization</TableHead>
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
                    <Button variant="outline">Status</Button>
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
                          className="bg-green-500 text-white hover:bg-green-600"
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
              <TableCell className="font-medium">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    className="min-w-[100px] capitalize"
                    asChild>
                    <Button>{user?.role}</Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>Authorization Level</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      onClick={() =>
                        handleToggleUserRole(`${user?._id}`, "admin")
                      }>
                      Admin
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      onClick={() =>
                        handleToggleUserRole(`${user?._id}`, "volunteer")
                      }>
                      volunteer
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      onClick={() =>
                        handleToggleUserRole(`${user?._id}`, "donor")
                      }>
                      Donor
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllRegisterUser;
