import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const getInitialTheme = () => {
        const cookieTheme = Cookies.get("theme");
        if (cookieTheme) {
            return cookieTheme;
        }
        const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
        return prefersDarkScheme ? "light" : "dark";
    };

    const [theme, setTheme] = useState(getInitialTheme);

    useEffect(() => {
        document.documentElement.className = theme;
        Cookies.set("theme", theme, { expires: 30, secure: true, sameSite: 'Strict' });
    }, [theme]);

    useEffect(() => {
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
