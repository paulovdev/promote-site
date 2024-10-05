import React from "react";
import { useTheme } from "../../context/ThemeContext";

import { IoMdSunny } from "react-icons/io";
import { IoMoon } from "react-icons/io5";

import "./ThemeChange.scss";

function ThemeChange() {
    const { theme, changeTheme } = useTheme();

    const handleToggle = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        changeTheme(newTheme);
    };

    return (
        <div id="change-theme" onClick={handleToggle} className="toggle-switch">
            {theme === "dark" ? (
                <IoMoon className="icon moon" />
            ) : (
                <IoMdSunny className="icon sun" />
            )}
        </div>
    );
}

export default ThemeChange;
