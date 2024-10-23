import useThemeChanger from "@/hooks/useThemeToggle";
import React, { FC } from "react";

type Props = React.PropsWithChildren<{
  className?: string;
  activeChatId?: string;
  onActiveChatIdChange?: (chatId: string) => void;
}>;

const ChatLayout: FC<Props> = ({ className = "", ...props }) => {
  const { theme, setTheme } = useThemeChanger();
  return (
    <div className="drawer h-screen md:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content h-screen">
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button absolute left-2 top-2 z-50 md:hidden"
        >
          Open drawer
        </label>
        <div className={"h-full " + className}>{props.children}</div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <button
          className="btn btn-square btn-ghost"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          Toggle theme
        </button>
        <ul className="menu min-h-full w-80 bg-base-200 p-4 text-base-content">
          {Array.from({ length: 10 }).map((_, i) => (
            <li key={i}>
              <a
                href={`${process.env.NEXT_PUBLIC_HOST}/chat/${i}`}
                className={props.activeChatId === i.toString() ? "active" : ""}
              >
                Item {i}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ChatLayout;
