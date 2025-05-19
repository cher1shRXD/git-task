import { Loader } from "lucide-react";

const Loading = () => {
  return (
    <div className="w-full h-full flex items-center justify-center gap-2 flex-col">
      데이터 불러오는 중...
      <Loader color="gray" className="animate-spin" size={40} />
    </div>
  );
}

export default Loading