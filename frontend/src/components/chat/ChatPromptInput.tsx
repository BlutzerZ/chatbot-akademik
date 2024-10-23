import { FC } from "react";
import Icon from "../Icon";

type Props = {
  className?: string;
  onPrompt?: (prompt: string) => void;
};

const ChatPromptInput: FC<Props> = (props) => {
  return (
    <div className={"join w-full px-2 md:px-72 lg:mx-auto pb-5 lg:pb-20 pt-3 bg-primary"}>
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
