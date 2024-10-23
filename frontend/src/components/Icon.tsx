import { FC } from "react";

type Props = {
  name: string;
  outlined?: boolean;
  className?: string;
};

const Icon: FC<Props> = (props) => {
  return (
    <span
      className={
        "material-symbols-rounded" +
        (props.outlined ? " material-symbols-rounded-outlined" : "") +
        (props.className ? " " + props.className : "")
      }
    >
      {props.name}
    </span>
  );
};

export default Icon;
