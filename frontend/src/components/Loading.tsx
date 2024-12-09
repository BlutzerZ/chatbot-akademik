import Logo from "@/components/Logo";

const Loading = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10">
      <Logo width={200} />
      <div className="text-primary loading loading-spinner loading-md"></div>
    </div>
  );
};

export default Loading;
