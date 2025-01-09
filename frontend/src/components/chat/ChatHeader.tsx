"use client";

import Icon from "../Icon";
import Logo from "../Logo";
import ToggleTheme from "../ToggleTheme";
import ToggleDrawer from "./ToggleDrawer";
import NoSsr from "../NoSsr";
import LogoutModalPortal from "./LogoutModalPortal";

export default function ChatHeader() {
  return (
    <div className="navbar w-full justify-between bg-base-100 px-5 md:pt-3">
      <div className="flex gap-5">
        <ToggleDrawer />
        <Logo width={100} />
      </div>
      <div className="flex">
        <NoSsr>
          <ToggleTheme />
        </NoSsr>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost m-1 p-2">
            <Icon name="account_circle" />
          </div>
          <ul
            tabIndex={0}
            className="text-primary menu dropdown-content z-[1] w-fit rounded-box bg-base-300 p-2 shadow"
          >
            <li className="flex">
              <LogoutModalPortal />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
