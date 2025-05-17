import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Loader color="gray" className="animate-spin" />
    </div>
  );
}

export default Loading