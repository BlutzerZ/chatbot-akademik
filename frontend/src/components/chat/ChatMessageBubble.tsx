import { FC } from "react";
import { ChatMessageRating, MessagesResponse } from "./types";
import ChatMessageBubbleFooter from "./ChatBubbleFooter";

type Props = MessagesResponse["data"]["data"][0] & {
  onRate?: (rating: ChatMessageRating) => void;
};

const ChatMessageBubble: FC<Props> = (props) => {
  const isAssistant = props.role === "ASSISTANT" ? true : false;

  return (
    <div
      className={`chat ${
        props.role === "ASSISTANT" ? "chat-start" : "chat-end"
      }`}
    >
      <div className="avatar chat-image">
        <div className="w-10 rounded-full">
          {/* <img alt={props.sender} src={props.avatarUrl} /> */}
        </div>
      </div>
      <div
        className={`chat-header mb-1 ${props.role === "ASSISTANT" ? "ml-3" : "mr-3"}`}
      >
        <span className="mr-2 font-medium">{props.role}</span>
        <time className="text-xs opacity-50">{props.created_at}</time>
      </div>
      <div
        className={`chat-bubble ${props.role === "ASSISTANT" ? "chat-bubble-neutral" : "chat-bubble-primary"}`}
      >
        {props.content}
      </div>
      <ChatMessageBubbleFooter
        id={props.id}
        rateable={isAssistant}
        onRate={props.onRate}
        rating={0}
        regeneratable={isAssistant}
        reportable={isAssistant}
      />
    </div>
  );
};

export default ChatMessageBubble;
