import React from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";

interface LogoProps {
  size?: number;
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ size = 36, className = "" }) => {
  return (
    <Link href="/">
      <motion.div 
        className={`flex items-center justify-center cursor-pointer ${className}`}
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.div 
          className="w-10 h-10 mr-3 flex-shrink-0"
          initial={{ rotate: -10, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
        >
          <svg 
            width="100%" 
            height="100%" 
            viewBox="0 0 400 400" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
            preserveAspectRatio="xMidYMid meet"
          >
            <g fill="currentColor">
              <path d="M100,100 L300,100 Q350,100 350,150 L350,350 Q350,400 300,400 L100,400 Q50,400 50,350 L50,150 Q50,100 100,100 Z M100,150 Q75,150 75,175 L75,325 Q75,350 100,350 L300,350 Q325,350 325,325 L325,175 Q325,150 300,150 L100,150 Z" />
              <circle cx="230" cy="230" r="30" />
            </g>
          </svg>
        </motion.div>
        <motion.span 
          className="text-xl font-semibold text-white"
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
        >
          The Side Character
        </motion.span>
      </motion.div>
    </Link>
  );
};

export default Logo;