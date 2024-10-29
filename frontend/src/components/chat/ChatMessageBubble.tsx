import { FC } from "react";
import { ChatMessage, ChatMessageRating } from "./types";
import ChatMessageBubbleFooter from "./ChatBubbleFooter";

type Props = ChatMessage & {
  onRate?: (rating: ChatMessageRating) => void;
};

const ChatMessageBubble: FC<Props> = (props) => {
  return (
    <div
      className={`chat ${
        props.position === "left" ? "chat-start" : "chat-end"
      } md:mx-36 lg:mx-72`}
    >
      <div className="avatar chat-image">
        <div className="w-10 rounded-full">
          <img alt={props.sender} src={props.avatarUrl} />
        </div>
      </div>
      <div
        className={`chat-header mb-1 ${props.position === "left" ? "ml-3" : "mr-3"}`}
      >
        <span className="mr-2 font-medium">{props.sender}</span>
        <time className="text-xs opacity-50">
          {props.createdAt?.toLocaleTimeString()}
        </time>
      </div>
      <div
        className={`chat-bubble ${props.sender === "Asisten" ? "chat-bubble-neutral" : "chat-bubble-primary"}`}
      >
        {props.content}
      </div>
      <ChatMessageBubbleFooter
        id={props.id}
        rateable={props.rateable}
        onRate={props.onRate}
        rating={props.rating}
        regeneratable={props.regeneratable}
        reportable={props.reportable}
      />
    </div>
  );
};

export default ChatMessageBubble;
