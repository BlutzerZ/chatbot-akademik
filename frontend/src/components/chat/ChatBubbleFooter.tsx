import { FC } from "react";
import Icon from "../Icon";
import { ChatMessageRating } from "./types";

type Props = {
  rating?: ChatMessageRating;
  rateable?: boolean;
  onRate?: (rating: ChatMessageRating) => void;
  regeneratable?: boolean;
  onRequestRegenerate?: () => void;
};

const ChatMessageBubbleFooter: FC<Props> = (props) => {
  const isRated = props.rating !== undefined;
  const isThumbsUp = isRated && props.rating === 1;
  const isThumbsDown = isRated && props.rating === -1;

  return (
    <div className="chat-footer">
      {props.rateable && (
        <>
          <div className="tooltip tooltip-bottom" data-tip="Pesan ini membantu">
            <button
              className="btn btn-circle btn-ghost"
              onClick={() => props.onRate?.(isThumbsUp ? 0 : 1)}
            >
              <Icon name="thumb_up" outlined={!isThumbsUp} />
            </button>
          </div>
          <div
            className="tooltip tooltip-bottom"
            data-tip="Pesan ini tidak membantu"
          >
            <button
              className="btn btn-circle btn-ghost"
              onClick={() => props.onRate?.(isThumbsDown ? 0 : -1)}
            >
              <Icon name="thumb_down" outlined={!isThumbsDown} />
            </button>
          </div>
        </>
      )}
      {props.regeneratable && (
        <div className="tooltip tooltip-bottom" data-tip="Generate ulang pesan">
          <button
            className="btn btn-circle btn-ghost"
            onClick={() => props.onRequestRegenerate?.()}
          >
            <Icon name="autorenew" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatMessageBubbleFooter;
