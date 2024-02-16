import {createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const useTheme = () =>{
    return useContext(ThemeContext)
}

export const ThemeProvider = ({children}) =>{
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () =>{
        setIsDarkMode((prevState) => !prevState);
    }

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    },[isDarkMode])

    const theme =  isDarkMode ? "dark" : "light";

    return <ThemeContext.Provider value={{theme, toggleTheme}}>{children}</ThemeContext.Provider>
}