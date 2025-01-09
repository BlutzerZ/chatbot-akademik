import LogoutModalPortal from "../chat/LogoutModalPortal";
import ToggleDrawer from "../chat/ToggleDrawer";
import Icon from "../Icon";
import NoSsr from "../NoSsr";
import ToggleTheme from "../ToggleTheme";

const DashboardHeader = () => {
  return (
    <>
      <div className="navbar bg-base-200">
        <div className="ml-10 flex-1">
          <ToggleDrawer />
        </div>
        <div className="flex items-center">
          <div className="dropdown dropdown-end mr-10 space-x-14">
            <NoSsr>
              <ToggleTheme />
            </NoSsr>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost m-1 space-x-3 p-2"
            >
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
    </>
  );
};

export default DashboardHeader;
