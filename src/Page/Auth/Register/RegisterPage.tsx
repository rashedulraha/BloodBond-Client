import useAuth from "@/Hook/useAuth/useAuth";
import Container from "@/Page/Shared/Responsive/Container";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

type Inputs = {
  firstName: string;
  lastName: string;
  fileInput: FileList;
  email: string;
  bloodGroup: string;
  district: string;
  upazila: string;
  password: string;
  confirmPassword: string;
};

const RegisterPage = () => {
  const { register, handleSubmit } = useForm<Inputs>();

  const { registerUser } = useAuth();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    const email = data.email;
    const password = data.password;

    registerUser(email, password).then((res: unknown) => {
      console.log(res);
      toast.success("Registration successfully");
    });
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <Container>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-lg mx-auto my-10 space-y-5">
        <div className="flex items-center gap-5">
          <div>
            <label className="">FirstName</label>
            <input
              type="text"
              className="input"
              placeholder="First Name"
              {...register("firstName")}
            />
          </div>
          <div>
            <label className="">FirstName</label>
            <input
              type="text"
              className="input"
              placeholder="Last Name"
              {...register("lastName")}
            />
          </div>
        </div>
        <div>
          <label htmlFor="inputFile">Input File</label>
          <input
            type="file"
            className="file-input w-full"
            placeholder="Input your photo"
            {...register("fileInput")}
          />
        </div>

        <div className="flex items-center gap-5">
          <div className="w-full">
            <label htmlFor="emailInput">Email</label>
            <input
              type="email"
              className="input w-full"
              placeholder="rashedul@gmail.com"
              {...register("email")}
            />
          </div>
          <div className="w-full">
            <label htmlFor="district">Blood Group</label>
            <select
              defaultValue="Pick a color"
              className="select"
              {...register("bloodGroup")}>
              <option disabled={true}>Select your Blood group</option>
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div className="w-full">
            <select
              defaultValue="Pick a color"
              className="select"
              {...register("district")}>
              <option disabled={true}>District</option>
              <option>Crimson</option>
              <option>Amber</option>
              <option>Velvet</option>
            </select>
          </div>
          <div className="w-full">
            <select
              defaultValue="Upazila"
              className="select"
              {...register("upazila")}>
              <option disabled={true}>Upazila</option>
              <option>Crimson</option>
              <option>Amber</option>
              <option>Velvet</option>
            </select>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <div>
            <label htmlFor="password"> Password</label>
            <input
              type="password"
              className="input w-full"
              placeholder="input your secure password"
              {...register("password")}
            />
          </div>
          <div>
            <label htmlFor="password"> Confirm Password</label>
            <input
              type="password"
              className="input w-full"
              placeholder="input your secure password"
              {...register("confirmPassword")}
            />
          </div>
        </div>

        <input type="submit" className="btn w-full" />
      </form>
    </Container>
  );
};

export default RegisterPage;
