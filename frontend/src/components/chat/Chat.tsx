import { FC } from "react";
import { ChatMessage, ChatMessageRating } from "./types";
import ChatMessageBubble from "./ChatBubble";
import ChatPrompt from "./ChatPrompt";

type Props = {
  className?: string;
  messages: ChatMessage[];
  onRate?: (messageId: string, rating: ChatMessageRating) => void;
};

const Chat: FC = (props) => {
  return (
    <div className={"flex flex-col " + (props.className || "")}>
      <div className="flex-1 overflow-x-auto">
        {props.messages.map((message) => (
          <ChatMessageBubble
            key={message.id}
            {...message}
            onRate={(rating) => props.onRate?.(message.id, rating)}
          />
        ))}
      </div>
      <ChatPrompt />
    </div>
  );
};

export default Chat;
