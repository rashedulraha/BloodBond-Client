import { HashLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center  h-screen z-999 absolute top-0 inset-0 bg-base-200">
      <HashLoader color="#fb2c36" />
    </div>
  );
};

export default LoadingSpinner;
