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
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import type { AllRequester } from "@/types/blog";

import { Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const AllDonationRequest = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], refetch } = useQuery({
    queryKey: ["register-user"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/donation-request-info`);
      return res.data;
    },
  });

  const handleDeleDonationRequester = (id: string) => {
    axiosSecure.delete(`/donation-request-delete/${id}`).then((res) => {
      refetch();
      console.log("donation requester deleted");
    });
  };

  return (
    <div>
      <div className="flex items-center justify-between pb-5">
        <div>
          <header className="max-w-7xl mx-auto mb-8">
            <h1 className="text-4xl font-extrabold text-foreground flex items-center capitalize">
              <Users className="w-8 h-8 mr-3 text-primary" />
              all Donation Request
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
            <TableHead className="w-[100px]">Requester Name</TableHead>
            <TableHead>Recipient Name</TableHead>
            <TableHead>Blood Group</TableHead>
            <TableHead>Hospital Name</TableHead>
            <TableHead>donationStatus</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: AllRequester) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium capitalize">
                <figure className="w-10 h-10 rounded-full border border-primary overflow-hidden">
                  <img src={user.imageURL} alt={user.recipientName} />
                </figure>
              </TableCell>
              <TableCell className="font-medium">
                {user.requesterName}
              </TableCell>
              <TableCell className="font-medium">
                {user.recipientName}
              </TableCell>
              <TableCell className="font-medium">{user.bloodGroup}</TableCell>
              <TableCell className="font-medium">{user.hospitalName}</TableCell>
              <TableCell className="font-medium">
                {user.donationStatus}
              </TableCell>
              <TableCell className="font-medium">
                <Button
                  onClick={() => handleDeleDonationRequester(`${user._id}`)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllDonationRequest;
