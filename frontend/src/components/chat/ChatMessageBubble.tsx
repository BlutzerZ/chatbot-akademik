import { FC } from "react";
import { ChatMessageRating } from "./types";
import ChatMessageBubbleFooter from "./ChatBubbleFooter";
import Markdown from "react-markdown";

type Props = {
  onRate?: (rating: ChatMessageRating) => void;
  id: string;
  role?: string;
  content?: string;
  created_at?: string;
};

const ChatMessageBubble: FC<Props> = (props) => {
  const isAssistant = props.role === "ASSISTANT" ? true : false;
  const date = new Date(props.created_at?.toString() || "").toLocaleString();

  return (
    <div
      className={`chat py-3 ${
        props.role === "ASSISTANT" ? "chat-start" : "chat-end"
      }`}
    >
      {/* <div className="avatar chat-image">
        <div className="w-10 rounded-full">
        </div>
      </div> */}
      <div
        className={`chat-header mb-1 ${props.role === "ASSISTANT" ? "ml-3" : "mr-3"}`}
      >
        <span className="mr-2 font-bold">{props.role}</span>
        <time className="text-xs opacity-50">{date}</time>
      </div>
      <div
        className={`chat-bubble ${props.role === "ASSISTANT" ? "chat-bubble-neutral" : "chat-bubble-primary"}`}
      >
        <Markdown>{props.content}</Markdown>
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
