import { FC } from "react";
import { ChatMessage, ChatMessageRating } from "./types";
import ChatMessageBubble from "./ChatBubble";

type Props = {
  className?: string;
  messages: ChatMessage[];
  onRate?: (messageId: string, rating: ChatMessageRating) => void;
};

const Chat: FC<Props> = (props) => {
  return (
    <div className={"flex flex-col content-center " + (props.className || "")}>
      <div className="flex-1 pt-5 pb-20 px-5">
        {props.messages.map((message) => (
          <ChatMessageBubble
            key={message.id}
            {...message}
            onRate={(rating) => props.onRate?.(message.id, rating)}
          />
        ))}
      </div>

      

    </div>
  );
};

export default Chat;
