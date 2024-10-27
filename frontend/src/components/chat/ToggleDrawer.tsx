import Icon from "../Icon";

export default function ToggleDrawer() {
  return (
    <label
      htmlFor="my-drawer-2"
      className="btn btn-ghost drawer-button left-2 top-2 md:hidden px-0"
    >
      <Icon name="menu" />
    </label>
  );
}
