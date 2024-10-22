import { MessageType } from "@/types/MessageType";

export default function MessageBubble({ message }: { message: MessageType }) {
  return (
    <div
      key={message.id}
      className={`flex gap-2 w-full ${
        message.sender != "bngky" ? "justify-end" : "justify-start"
      }`}
    >
      {message.sender === "bngky" && (
        <span className="material-symbols-outlined text-primary-700 mt-2">
          smart_toy
        </span>
      )}
      <div className="">
        <div
          className={`py-3 px-5 rounded-2xl ${
            message.sender != "bngky"
              ? "bg-primary-700 text-white"
              : "bg-primary-50 border border-1 border-primary-100 text-black"
          } h-fit w-auto max-w-96`}
        >
          <p>{message.content}</p>
        </div>
        {message.sender === "bngky" && (
          <div className="flex gap-3 justify-end py-2 mr-2">
            <button className="hover:bg-red-500">
              <span className="material-symbols-outlined text-primary-700">
                thumb_up
              </span>
            </button>
            <button>
              <span className="material-symbols-outlined text-primary-700">
                thumb_down
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
