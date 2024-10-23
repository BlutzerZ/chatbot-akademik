import { FC } from "react";
import Icon from "../Icon";

type Props = {
  className?: string;
  onPrompt?: (prompt: string) => void;
};

const ChatPromptInput: FC<Props> = (props) => {
  return (
    <div className={"rounded-none relative z-10 join w-full px-2 md:px-72 lg:mx-auto pb-5 lg:pb-20 pt-3 shadow-[0px_-5px_40px_30px_rgba(var(--tw-bg-opacity),_100)] bg-base-100"}>
      <input
        type="text"
        placeholder="Tanyakan sesuatu"
        className="input join-item input-primary focus:outline-none flex-1 rounded-2xl"
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
