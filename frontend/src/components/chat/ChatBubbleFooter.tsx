import { FC } from "react";
import Icon from "../Icon";
import { ChatMessageRating, ChatReported } from "./types";
import ReportModalPortal from "./ReportModalPortal";

type Props = {
  id: string;
  rating?: ChatMessageRating;
  report?: ChatReported;
  rateable?: boolean;
  onRate?: (rating: ChatMessageRating) => void;
  regeneratable?: boolean;
  reportable?: boolean;
  onRequestRegenerate?: () => void;
};

const ChatMessageBubbleFooter: FC<Props> = (props) => {
  const isRated = props.rating !== undefined;
  const isReported = props.report !== undefined;
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
      {props.reportable && (
        <ReportModalPortal reported={isReported} id={props.id} />
      )}
    </div>
  );
};

export default ChatMessageBubbleFooter;
