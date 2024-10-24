import { FC } from "react";
import Icon from "../Icon";

type Props = {
  className?: string;
  onPrompt?: (prompt: string) => void;
};

const ChatPromptInput: FC<Props> = (props) => {
  return (
    <div
      className={
        "join relative z-10 w-full rounded-none bg-base-100 px-2 pb-5 pt-3 shadow-[0px_-5px_40px_30px_rgba(var(--tw-bg-opacity),_100)] md:px-72 lg:mx-auto lg:pb-20"
      }
    >
      <input
        type="text"
        placeholder="Tanyakan sesuatu"
        className="input join-item input-primary flex-1 rounded-2xl focus:outline-none"
      />
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
