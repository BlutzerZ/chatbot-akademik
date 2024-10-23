import { useEffect, useState } from "react";

export default function useThemeChanger() {
  const [theme, setTheme] = useState<string>(
    localStorage.getItem("theme") ? localStorage.getItem("theme")! : "light",
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.querySelector("html")!.setAttribute("data-theme", theme);
  }, [theme]);

  return {theme, setTheme};
}
