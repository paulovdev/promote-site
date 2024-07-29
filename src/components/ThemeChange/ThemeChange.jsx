import React from "react";
import { useTheme } from "../../context/ThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";
import "./ThemeChange.scss";

function ThemeChange() {
    const { theme, changeTheme } = useTheme();

    const handleToggle = () => {
        const newTheme = theme === "dark" ? "light" : "dark";
        changeTheme(newTheme);
    };

    return (
        <div id="change-theme">
            <div className="toggle-switch" onClick={handleToggle}>
                <input
                    type="checkbox"
                    checked={theme === "dark"}
                    onChange={handleToggle}
                />
                <span className="slider">
                    <FaMoon className="icon moon" />
                    <FaSun className="icon sun" />
                </span>
            </div>
        </div>
    );
}

export default ThemeChange;
