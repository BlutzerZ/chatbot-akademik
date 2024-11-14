import Icon from "@/components/Icon";
// import { Conversations } from "@/types/ConversationTypes";
import Link from "next/link";
import React, { FC } from "react";

type Conversation = {
  id: string;
  created_at: string;
  updated_at: string;
};

type Props = React.PropsWithChildren<{
  conversations?: Conversation[];
  isPending?: boolean;
  className?: string;
  activeChatId?: string;
  onActiveChatIdChange?: (chatId: string) => void;
}>;

const ChatLayout: FC<Props> = ({ className = "", ...props }) => {
  // console.log(props.conversations);
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
              {props.conversations?.map((conversation) => (
                <Link
                  key={conversation.id}
                  href={`/chat/${conversation.id}`}
                  className={`${props.activeChatId === conversation.id ? "active font-bold" : ""}`}
                >
                  <button
                    className={`w-full rounded-md px-6 py-4 text-start hover:bg-base-200 md:hover:bg-base-100 ${props.activeChatId === conversation.id ? "bg-base-200 md:bg-base-300" : ""}`}
                  >
                    {new Date(conversation.created_at).toLocaleString()}
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
