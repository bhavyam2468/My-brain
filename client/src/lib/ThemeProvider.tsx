import React, { createContext, useEffect, useState } from "react";

type Theme = "dark";
export type ThemeColor = "purple" | "blue" | "green" | "rose" | "amber" | "red" | "teal" | "indigo";

interface ThemeContextType {
  theme: Theme;
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  themeColor: "blue",
  setThemeColor: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [themeColor, setThemeColorState] = useState<ThemeColor>("blue");

  // Initialize theme color from stored preference and apply immediately
  useEffect(() => {
    // Force dark mode since light mode is removed
    document.documentElement.classList.add('dark');
    document.documentElement.classList.remove('light');
    
    // Get saved theme color
    const savedThemeColor = localStorage.getItem("themeColor") as ThemeColor;
    const validColors: ThemeColor[] = ["purple", "blue", "green", "rose", "amber", "red", "teal", "indigo"];
    
    // If saved color is valid, use it, otherwise set default
    if (savedThemeColor && validColors.includes(savedThemeColor)) {
      setThemeColorState(savedThemeColor);
    } else {
      // Default to blue and store it
      localStorage.setItem("themeColor", "blue");
    }
  }, []);

  // Apply theme color class to document whenever themeColor changes
  useEffect(() => {
    if (!themeColor) return;

    // Remove all theme classes
    const root = window.document.documentElement;
    root.classList.remove(
      "theme-purple", 
      "theme-blue", 
      "theme-green", 
      "theme-rose", 
      "theme-amber",
      "theme-red",
      "theme-teal",
      "theme-indigo"
    );
    
    // Add new theme class
    root.classList.add(`theme-${themeColor}`);
    
    // Store in localStorage
    localStorage.setItem("themeColor", themeColor);
    
    // Apply theme color to CSS root variables immediately
    document.documentElement.style.setProperty('--gradient-start-applied', `var(--gradient-start)`);
    document.documentElement.style.setProperty('--gradient-mid-applied', `var(--gradient-mid)`);
    document.documentElement.style.setProperty('--gradient-end-applied', `var(--gradient-end)`);
    
  }, [themeColor]);

  const setThemeColor = (newColor: ThemeColor) => {
    setThemeColorState(newColor);
  };

  return (
    <ThemeContext.Provider value={{ theme: "dark", themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};
