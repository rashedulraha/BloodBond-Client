import { HashLoader } from "react-spinners";

const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-base-200">
      <HashLoader color="#fb2c36" />
    </div>
  );
};

export default LoadingSpinner;
