import { FC } from "react";
import { ChatMessage, ChatMessageRating } from "./types";
import ChatMessageBubbleFooter from "./ChatBubbleFooter";

type Props = ChatMessage & {
  onRate?: (rating: ChatMessageRating) => void;
};

const ChatMessageBubble: FC = (props) => {
  return (
    <div
      className={`chat ${
        props.position === "left" ? "chat-start" : "chat-end"
      }`}
    >
      <div className="avatar chat-image">
        <div className="w-10 rounded-full">
          <img alt={props.sender} src={props.avatarUrl} />
        </div>
      </div>
      <div className="chat-header">
        {props.sender}
        <time className="text-xs opacity-50">
          {props.createdAt?.toLocaleTimeString()}
        </time>
      </div>
      <div className="chat-bubble">{props.content}</div>
      <ChatMessageBubbleFooter
        rateable={props.rateable}
        onRate={props.onRate}
        rating={props.rating}
        regeneratable={props.regeneratable}
      />
    </div>
  );
};

export default ChatMessageBubble;
