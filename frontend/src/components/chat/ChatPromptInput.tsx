import { FC } from "react";
import Icon from "../Icon";

type Props = {
  className?: string;
  onPrompt?: (prompt: string) => void;
};

const ChatPromptInput: FC<Props> = (props) => {
  return (
    <div className={`+ join ${props.className}`}>
      <input
        type="text"
        placeholder="Tanyakan sesuatu"
        className="input join-item input-primary flex-1 rounded-2xl focus:outline-none"
      />
      {/* <textarea name="message" id="message" placeholder="Tanyakan sesuatu..."
        className="input join-item input-primary h-full py-3 focus:outline-none rounded-2xl resize-none overflow-hidden"
        rows={1}
        onInput={(e: React.FormEvent<HTMLTextAreaElement>) => {
              const target = e.target as HTMLTextAreaElement;
              target.style.height = 'auto'; // Reset height
              target.style.height = `${target.scrollHeight}px`; // Set height based on content
        }}
      ></textarea> */}
      <button
        className="btn btn-primary join-item rounded-2xl"
        onClick={() => props.onPrompt?.("Hello")}
      >
        <Icon name="send" />
      </button>
    </div>
  );
};

export default ChatPromptInput;
