import Logo from "../Logo";
import ToggleTheme from "../ToggleTheme";
import ToggleDrawer from "./ToggleDrawer";

export default function ChatHeader() {
  return (
    <div className="navbar w-full justify-between bg-base-100 py-5 md:px-10">
      <div className="flex gap-2">
        <ToggleDrawer />
        <Logo />
      </div>
      <ToggleTheme />
    </div>
  );
}
