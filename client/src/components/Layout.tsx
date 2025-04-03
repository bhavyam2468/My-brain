import React from "react";
import { motion } from "framer-motion";
import NavMenu from "./NavMenu";
import ThemeSwitcher from "./ThemeSwitcher";
import FloatingShapes from "./FloatingShapes";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen dark theme-blue">
      {/* Background Particle Layers */}
      {/* First two layers are handled by ::before and ::after on body */}
      {/* This is the third, smallest, fastest layer */}
      <div className="particle-layer-three" />
      
      {/* Floating translucent shapes */}
      <FloatingShapes />
      
      {/* Navigation Menu */}
      <NavMenu />
      
      {/* Theme Switcher */}
      <ThemeSwitcher />

      {/* Main content with motion transitions */}
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen w-full"
      >
        {children}
      </motion.main>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} The Side Character • Made with overthinking</p>
      </footer>
    </div>
  );
};

export default Layout;
