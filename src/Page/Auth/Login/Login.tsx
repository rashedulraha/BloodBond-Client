import useAuth from "@/Hook/useAuth/useAuth";
import Container from "@/Page/Shared/Responsive/Container";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

type Inputs = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const { register, handleSubmit } = useForm<Inputs>();
  const { loginUser } = useAuth();

  const onInputSubmit: SubmitHandler<Inputs> = (data) => {
    const email = data?.email;
    const password = data?.password;
    loginUser(email, password).then((res) => {
      toast.success("successfully sign in");
    });
  };

  return (
    <Container>
      <div>
        <form
          className="space-y-5 max-w-lg mx-auto my-10"
          onSubmit={handleSubmit(onInputSubmit)}>
          <div className="flex flex-col space-y-2">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              {...register("email")}
              placeholder="Enter your email"
              className="input w-full"
            />
          </div>
          <div className="flex flex-col space-y-2">
            <label htmlFor="email">Email</label>
            <input
              type="password"
              {...register("password")}
              placeholder="Enter your valid password"
              className="input w-full"
            />
          </div>
          <input type="submit" className="btn shadow-none" />
        </form>
      </div>
    </Container>
  );
};

export default LoginPage;
