import ChatPromptInput from "./ChatPromptInput";

export default function NewChat() {
  return (
    <div className="mb-10 flex h-screen flex-col items-center justify-center md:gap-10">
      <div className="h-full content-center px-5 md:h-fit md:w-1/2">
        <h1 className="text-center text-4xl font-semibold">
          Halo, apa yang bisa aku bantu? :)
        </h1>
      </div>
      <ChatPromptInput className="w-full border-0 px-2 pb-2 pt-3 md:w-1/2 md:px-0 md:pb-0 md:pt-0" />
    </div>
  );
}
