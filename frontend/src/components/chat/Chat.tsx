import { FC } from "react";
import { ChatMessageRating, Message } from "./types";
import ChatMessageBubble from "./ChatMessageBubble";

type Props = {
  className?: string;
  messages: Message[];
  onRate?: (messageId: string, rating: ChatMessageRating) => void;
  isLoading?: boolean;
};

const Chat: FC<Props> = (props) => {
  // const isLoading = true;
  return (
    <div className={"flex flex-col content-center " + (props.className || "")}>
      <div className="flex-1 px-5 pb-20 pt-5 md:px-36 lg:px-80">
        {(props.messages || []).map((message) => (
          <ChatMessageBubble
            key={message.id}
            {...message}
            onRate={(rating) => props.onRate?.(message.id, rating)}
          />
        ))}

        {props.isLoading && (
          <>
            <div className="flex gap-2">
              <div className="avatar chat-image">
                <div className="w-10 rounded-full">
                  {/* <img alt="assistant" src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" /> */}
                </div>
              </div>
              <div className="skeleton flex h-14 w-80 items-center gap-5 px-5">
                <span className="loading loading-ring loading-md"></span>
                <h1 className="">Loading...</h1>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
