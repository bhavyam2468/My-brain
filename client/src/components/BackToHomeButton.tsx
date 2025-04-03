import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";

const BackToHomeButton: React.FC = () => {
  const [, navigate] = useLocation();

  const handleClick = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.button
      initial={{ opacity: 0, x: -10 }}
      animate={{ 
        opacity: 1, 
        x: 0,
        transition: { duration: 0.5, ease: "easeOut" }
      }}
      whileHover={{ 
        scale: 1.03, 
        x: -3,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      whileTap={{ 
        scale: 0.97,
        transition: { duration: 0.2, ease: "easeInOut" }
      }}
      onClick={handleClick}
      className="inline-flex items-center px-5 py-2.5 rounded-full glass text-primary-dark dark:text-white transition-all glow"
    >
      <motion.div
        initial={{ x: 0 }}
        whileHover={{ 
          x: -3,
          transition: { duration: 0.3, ease: "easeOut", repeat: 0 }
        }}
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
      </motion.div>
      Back to home
    </motion.button>
  );
};

export default BackToHomeButton;
