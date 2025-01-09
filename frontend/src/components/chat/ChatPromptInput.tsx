import { FC, useState } from "react";
import Icon from "../Icon";

type Props = {
  className?: string;
  onPrompt?: (prompt: string) => void;
  isLoading?: boolean;
  isSendDisabled?: boolean;
};

const ChatPromptInput: FC<Props> = (props) => {
  const [prompt, setPrompt] = useState("");
  const [isSendDisabled, setIsSendDisabled] = useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (prompt.trim() && props.onPrompt) {
      props.onPrompt(prompt);
      setPrompt("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`+ join ${props.className}`}>
      <input
        name="message"
        type="text"
        value={prompt}
        onChange={(e) => {
          setPrompt(e.target.value);
          setIsSendDisabled(false);
        }}
        autoComplete="off"
        placeholder="Tanyakan sesuatu"
        className="input join-item input-primary flex-1 rounded-2xl focus:outline-none"
      />
      <button
        type="submit"
        className="btn btn-primary join-item rounded-2xl"
        onClick={() => props.onPrompt}
        disabled={props.isLoading || isSendDisabled || prompt.trim() === ""}
      >
        <Icon name="send" />
      </button>
    </form>
  );
};

export default ChatPromptInput;
