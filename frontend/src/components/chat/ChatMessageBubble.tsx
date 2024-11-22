import { FC } from "react";
import { ChatMessageRating } from "./types";
import ChatMessageBubbleFooter from "./ChatBubbleFooter";

type Props = {
  onRate?: (rating: ChatMessageRating) => void;
  id: string;
  role?: string;
  content?: string;
  created_at?: string;
};

const ChatMessageBubble: FC<Props> = (props) => {
  const isAssistant = props.role === "ASSISTANT" ? true : false;

  return (
    <div
      className={`chat py-3 ${
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
        <span className="mr-2 font-bold">{props.role}</span>
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
