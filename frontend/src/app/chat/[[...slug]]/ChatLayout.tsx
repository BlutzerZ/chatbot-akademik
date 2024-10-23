import Icon from "@/components/Icon";
import ToggleDrawer from "@/components/chat/ToggleDrawer";
import Link from "next/link";
import React, { FC } from "react";

type Props = React.PropsWithChildren<{
  className?: string;
  activeChatId?: string;
  onActiveChatIdChange?: (chatId: string) => void;
}>;

const ChatLayout: FC<Props> = ({ className = "", ...props }) => {
  return (<>
    <div className="drawer h-screen md:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content h-screen overflow-x-hidden">
        <div className={"h-full " + className}>
          {props.children}
        </div>
      </div>

      <div className="drawer-side z-50">

        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="flex w-full">
          <div className="tooltip tooltip-right" data-tip="Home">
            <button className="btn btn-ghost">
              <Icon name="home"/>
            </button>
          </div>
          <div className="tooltip tooltip-right" data-tip="Buat percakapan baru">
            <button className="btn btn-ghost">
              <Icon name="edit_square"/>
            </button>
          </div>
        </div>

        <ul className="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
          {Array.from({ length: 10 }).map((_, i) => (
            <li key={i}>
              <Link
                href={`${process.env.NEXT_PUBLIC_HOST}/chat/${i}`}
                className={props.activeChatId === i.toString() ? "active" : ""}
              >
                Item {i}
              </Link>
            </li>
          ))}
        </ul>

      </div>
      
    </div></>
  );
};

export default ChatLayout;
