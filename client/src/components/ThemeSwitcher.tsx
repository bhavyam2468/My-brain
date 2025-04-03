import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Palette, ChevronDown } from "lucide-react";

// Define themes with their properties
const themes = {
  purple: {
    name: "Cosmic Purple",
    color: "bg-purple-500",
    gradientStart: "280, 100%, 50%",
    gradientMid: "260, 100%, 25%",
    gradientEnd: "240, 100%, 10%",
    particleColor: "rgba(147, 112, 219, 0.7)"
  },
  blue: {
    name: "Ocean Blue",
    color: "bg-blue-500",
    gradientStart: "220, 100%, 50%",
    gradientMid: "210, 100%, 25%",
    gradientEnd: "200, 100%, 10%",
    particleColor: "rgba(96, 165, 250, 0.7)"
  },
  green: {
    name: "Emerald",
    color: "bg-green-500",
    gradientStart: "160, 100%, 50%",
    gradientMid: "150, 100%, 30%",
    gradientEnd: "140, 100%, 10%",
    particleColor: "rgba(52, 211, 153, 0.7)"
  },
  rose: {
    name: "Sunset Rose",
    color: "bg-rose-500",
    gradientStart: "350, 100%, 50%",
    gradientMid: "335, 90%, 25%",
    gradientEnd: "325, 80%, 10%",
    particleColor: "rgba(244, 114, 182, 0.7)"
  },
  amber: {
    name: "Golden Amber",
    color: "bg-amber-500",
    gradientStart: "30, 100%, 50%",
    gradientMid: "20, 90%, 25%",
    gradientEnd: "10, 80%, 10%",
    particleColor: "rgba(251, 191, 36, 0.7)"
  },
  red: {
    name: "Crimson Red",
    color: "bg-red-500",
    gradientStart: "0, 100%, 50%",
    gradientMid: "0, 90%, 30%",
    gradientEnd: "0, 80%, 15%",
    particleColor: "rgba(239, 68, 68, 0.7)"
  },
  teal: {
    name: "Teal Oasis",
    color: "bg-teal-500",
    gradientStart: "175, 100%, 45%",
    gradientMid: "175, 90%, 25%",
    gradientEnd: "175, 80%, 10%",
    particleColor: "rgba(20, 184, 166, 0.7)"
  },
  indigo: {
    name: "Mystic Indigo",
    color: "bg-indigo-500",
    gradientStart: "240, 100%, 50%",
    gradientMid: "242, 90%, 25%",
    gradientEnd: "245, 80%, 15%",
    particleColor: "rgba(99, 102, 241, 0.7)"
  },
};

const ThemeSwitcher: React.FC = () => {
  // Get initial theme from localStorage or default to blue
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem("themeColor") || "blue";
    return savedTheme as keyof typeof themes;
  };

  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<keyof typeof themes>(getInitialTheme());

  const toggleDropdown = () => setIsOpen(!isOpen);

  const applyTheme = (themeKey: keyof typeof themes) => {
    const theme = themes[themeKey];
    
    // Store theme in localStorage
    localStorage.setItem("themeColor", themeKey);
    
    // Force root element to have dark class
    document.documentElement.classList.add('dark');
    
    // Remove all theme classes
    Object.keys(themes).forEach(key => {
      document.documentElement.classList.remove(`theme-${key}`);
    });
    
    // Add selected theme class
    document.documentElement.classList.add(`theme-${themeKey}`);
    
    // Set CSS variables directly
    document.documentElement.style.setProperty('--gradient-start', theme.gradientStart);
    document.documentElement.style.setProperty('--gradient-mid', theme.gradientMid);
    document.documentElement.style.setProperty('--gradient-end', theme.gradientEnd);
    document.documentElement.style.setProperty('--particle-color', theme.particleColor);
    
    // Update local state
    setCurrentTheme(themeKey);
    
    // Close dropdown
    setIsOpen(false);
  };

  return (
    <div className="fixed top-8 left-8 z-50">
      <div className="relative">
        <motion.button
          onClick={toggleDropdown}
          className="backdrop-blur-md bg-black/20 border border-white/20 shadow-lg rounded-full p-3 flex items-center justify-center ring-2 ring-white/10"
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.2 }}
          aria-label="Change theme color"
        >
          <Palette className="h-5 w-5 text-white" />
          <ChevronDown 
            className={`h-4 w-4 ml-1 text-white transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </motion.button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 mt-2 w-48 rounded-lg glass shadow-lg overflow-hidden z-50"
            >
              <div className="py-1">
                {Object.entries(themes).map(([key, theme]) => (
                  <motion.button
                    key={key}
                    className={`flex items-center w-full px-4 py-2 text-left transition-colors duration-200 ${currentTheme === key ? 'bg-white/20' : 'hover:bg-white/10'}`}
                    onClick={() => applyTheme(key as keyof typeof themes)}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className={`w-4 h-4 rounded-full mr-3 ${theme.color}`} />
                    <span className="text-white">{theme.name}</span>
                    {currentTheme === key && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="ml-auto text-xs text-white"
                      >
                        ✓
                      </motion.span>
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ThemeSwitcher;