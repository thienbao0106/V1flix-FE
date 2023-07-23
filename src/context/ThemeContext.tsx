import React, { useState, createContext } from "react";
import { profileSetting } from "../utils/Storage";
//Context
export const ThemeContext = createContext<any>("");
//Provider
const ThemeProvider: React.FC<any> = ({ children }) => {
  //Init state
  const [theme, setTheme] = useState(profileSetting.get("theme") || "dark");
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const value = { theme, toggleTheme };
  //save the setting
  profileSetting.set("theme", theme);
  //this will have account context
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeProvider;
