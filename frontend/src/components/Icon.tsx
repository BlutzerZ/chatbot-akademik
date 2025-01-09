import { FC } from "react";

type Props = {
  name: string;
  outlined?: boolean;
  className?: string;
  size?: number;
};

const Icon: FC<Props> = (props) => {
  return (
    <span
      className={
        "material-symbols-rounded" +
        (props.outlined ? " material-symbols-rounded-outlined" : "") +
        (props.className ? " " + props.className : "")
      }
      style={{ fontSize: props.size + "px" }}
    >
      {props.name}
    </span>
  );
};

export default Icon;
