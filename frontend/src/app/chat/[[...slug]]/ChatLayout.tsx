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

          <div className="flex flex-col h-full">
            <div className="flex w-full md:bg-base-200 px-5 pt-6 pb-4 md:pt-3 md:pb-1 md:px-10">
              <Link href={"/"} className="btn btn-ghost w-full justify-start text-lg">
                <Icon name="edit_square" />
                Percakapan baru
              </Link>
            </div>

            <div className="block menu h-full w-80 p-4 text-base-content md:bg-base-200 overflow-y-auto space-y-2">
              {Array.from({ length: 50 }).map((_, i) => (
                <button key={i} className="w-full rounded-md py-3 text-start px-6 hover:bg-base-200">
                    <Link
                      href={`${process.env.NEXT_PUBLIC_HOST}/chat/${i}`}
                      className={` ${props.activeChatId === i.toString() ? "active font-bold" : ""}`}
                    >
                      Item {i}
                    </Link>
                </button>
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
