import React from "react";
import { motion } from "framer-motion";
import Logo from "./Logo";

const Header: React.FC = () => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-8 left-1/2 transform -translate-x-1/2 z-40 w-auto"
    >
      <motion.div 
        className="glass rounded-full px-8 py-4 flex items-center justify-center shadow-lg"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        <Logo className="mx-auto" />
      </motion.div>
    </motion.header>
  );
};

export default Header;