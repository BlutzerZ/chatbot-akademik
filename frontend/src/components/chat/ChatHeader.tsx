import Logo from "../Logo";
import ToggleTheme from "../ToggleTheme";
import ToggleDrawer from "./ToggleDrawer";

export default function ChatHeader(){
      return(
            <div className="navbar bg-base-100 w-full py-5 md:px-10 justify-between">
                  <div className="flex gap-2">
                        <ToggleDrawer />
                        <Logo />
                  </div>
                  <ToggleTheme />
            </div>
      );
}