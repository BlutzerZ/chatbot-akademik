import { FC } from "react";
import Icon from "../Icon";

type Props = {
  className?: string;
  onPrompt?: (prompt: string) => void;
};

const ChatPrompt: FC = (props) => {
  return (
    <div className={"join w-full"}>
      <input
        type="text"
        placeholder="Tanyakan sesuatu"
        className="input join-item input-bordered input-primary flex-1"
      />
      <button
        className="btn btn-primary join-item"
        onClick={() => props.onPrompt?.("Hello")}
      >
        <Icon name="send" />
      </button>
    </div>
  );
};

export default ChatPrompt;
