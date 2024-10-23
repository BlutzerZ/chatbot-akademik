'use client';

import useThemeChanger from "@/hooks/useThemeToggle";
import Icon from "./Icon";

export default function ToggleTheme(){
      const { theme, setTheme } = useThemeChanger();

      return (
            <div className="tooltip tooltip-left md:tooltip-bottom" data-tip="Ganti tema">
                  <button
                  className="btn btn-square btn-ghost"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                  >
                        <Icon name={`${theme === "light"?"dark_mode":"light_mode"}`}/>
                  </button>
            </div>
      );
}