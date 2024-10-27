import { useRouter } from "next/navigation";
import Icon from "../Icon";
import Logo from "../Logo";
import ToggleTheme from "../ToggleTheme";
import ToggleDrawer from "./ToggleDrawer";

export default function ChatHeader() {
  
  const router = useRouter();

  // function handleLogout(){
  //   localStorage.removeItem("token");
  //   router.push("/")
  // }

  return (
    <div className="navbar w-full justify-between bg-base-100 py-5 md:pt-3 px-5">
      <div className="flex gap-5">
        <ToggleDrawer />
        <Logo />
      </div>
      <div className="flex gap-5">
        <ToggleTheme />
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="m-1">
            <Icon name="account_circle"/>
          </div>
          <ul tabIndex={0} className="dropdown-content menu bg-base-200 rounded-box z-[1] w-fit p-2 shadow text-error">
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
