import { useRouter } from "next/navigation";
import Icon from "../Icon";
import Logo from "../Logo";
import ToggleTheme from "../ToggleTheme";
import ToggleDrawer from "./ToggleDrawer";
import NoSsr from "../NoSsr";

export default function ChatHeader() {
  const router = useRouter();

  // function handleLogout(){
  //   localStorage.removeItem("token");
  //   router.push("/")
  // }

  return (
    <div className="navbar w-full justify-between bg-base-100 px-5 py-5 md:pt-3">
      <div className="flex gap-5">
        <ToggleDrawer />
        <Logo />
      </div>
      <div className="flex gap-5">
        <NoSsr>
          <ToggleTheme />
        </NoSsr>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost m-1 p-2">
            <Icon name="account_circle" />
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content z-[1] w-fit rounded-box bg-base-200 p-2 text-error shadow"
          >
            <li className="flex">
              <button className="">
                <Icon name="logout" />
                Keluar
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
