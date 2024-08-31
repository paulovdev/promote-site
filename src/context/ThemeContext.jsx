import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Function to get the preferred theme from cookies or default to system preference
    const getInitialTheme = () => {
        const cookieTheme = Cookies.get("theme");
        if (cookieTheme) {
            return cookieTheme;
        }
        // Check for system theme preference
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return prefersDarkScheme ? "light" : "dark";
    };

    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        // Apply theme to document
        document.documentElement.className = theme;
        // Save theme in cookies
        Cookies.set("theme", theme, { expires: 30 });
    }, [theme]);

    useEffect(() => {
        // Listen for system theme preference changes
        const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e) => {
            setTheme(e.matches ? "light" : "dark");
        };

        mediaQueryList.addEventListener("change", handleChange);
        return () => {
            mediaQueryList.removeEventListener("change", handleChange);
        };
    }, []);

    const changeTheme = (selectedTheme) => {
        setTheme(selectedTheme);
    };

    return (
        <ThemeContext.Provider value={{ theme, changeTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
