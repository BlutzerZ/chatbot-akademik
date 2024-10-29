import Icon from "@/components/Icon";
import Link from "next/link";
import React, { FC } from "react";

type Props = React.PropsWithChildren<{
  className?: string;
  activeChatId?: string;
  onActiveChatIdChange?: (chatId: string) => void;
}>;

const ChatLayout: FC<Props> = ({ className = "", ...props }) => {
  return (
    <>
      <div className="drawer h-screen md:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />

        <div className="drawer-content h-screen overflow-x-hidden">
          <div className={"h-full " + className}>{props.children}</div>
        </div>

        <div className="drawer-side z-50">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <div className="flex h-full flex-col bg-base-100 md:bg-base-200">
            <div className="flex w-full px-5 pb-4 pt-6 md:px-10 md:pb-1 md:pt-5">
              <Link
                href={"/chat/new"}
                className="btn btn-ghost w-full justify-start text-lg"
              >
                <Icon name="edit_square" />
                Percakapan baru
              </Link>
            </div>

            <div className="menu block h-full w-80 space-y-2 overflow-y-auto p-4 text-base-content md:bg-base-200">
              {Array.from({ length: 50 }).map((_, i) => (
                <Link
                  key={i}
                  href={`${process.env.NEXT_PUBLIC_HOST}/chat/${i}`}
                  className={` ${props.activeChatId === i.toString() ? "active font-bold" : ""}`}
                >
                  <button
                    className={`w-full rounded-md px-6 py-4 text-start hover:bg-base-200 md:hover:bg-base-100 ${props.activeChatId === i.toString() ? "bg-base-200 md:bg-base-300" : ""}`}
                  >
                    Item {i}
                  </button>
                </Link>
              ))}
            </div>

            {/* <div className="bg-white w-full h-36">
              <p>lorem</p>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatLayout;
