// components/ui/spinner.tsx
import { ClipLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <ClipLoader color="#36d7b7" size={50} />
    </div>
  );
};

export { Spinner };
