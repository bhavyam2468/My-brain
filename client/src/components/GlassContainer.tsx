import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassContainerProps {
  children: React.ReactNode;
  className?: string;
  animate?: boolean;
  delay?: number;
}

const GlassContainer: React.FC<GlassContainerProps> = ({
  children,
  className,
  animate = true,
  delay = 0,
}) => {
  const containerVariants = {
    hidden: { 
      opacity: 0, 
      y: 10, 
      scale: 0.98,
      filter: "blur(8px)"
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
        delay: delay * 0.2,
        filter: { duration: 0.9 }
      },
    },
  };

  return animate ? (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={cn("glass glass-hover rounded-2xl p-6 md:p-8", className)}
      whileHover={{ 
        y: -5,
        scale: 1.02,
        boxShadow: "0 10px 30px -15px rgba(0,0,0,0.3)",
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } 
      }}
    >
      {children}
    </motion.div>
  ) : (
    <div className={cn("glass rounded-2xl p-6 md:p-8", className)}>
      {children}
    </div>
  );
};

export default GlassContainer;
