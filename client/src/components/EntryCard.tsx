import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useLocation } from "wouter";
import { Entry } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface EntryCardProps {
  entry: Entry;
  index: number;
}

const EntryCard: React.FC<EntryCardProps> = ({ entry, index }) => {
  const [, navigate] = useLocation();
  const controls = useAnimation();
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = () => {
    navigate(`/thoughts/${entry.slug}`);
  };

  // Card animation variants
  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30, 
      scale: 0.95,
      filter: "blur(8px)"
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      filter: "blur(0px)",
      transition: { 
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1], // Custom ease with nice settling
        filter: { duration: 0.8 }
      }
    },
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When card comes into view
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          controls.start("visible");
        }
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0.1, // Trigger when at least 10% is visible
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [controls, isVisible]);

  return (
    <motion.div
      ref={elementRef}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      custom={index}
      whileHover={{ 
        y: -5, 
        scale: 1.03, 
        boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)",
        transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } 
      }}
      className="glass-card rounded-xl overflow-hidden cursor-pointer glass-hover"
      onClick={handleClick}
    >
      <div className="p-6">
        <h3 className="text-xl font-semibold text-white mb-2 line-clamp-1">
          {entry.title}
        </h3>
        <p className="text-gray-300 mb-4 line-clamp-2">
          {entry.description}
        </p>
        <motion.div 
          initial={{ x: -5, opacity: 0.8 }}
          whileHover={{ 
            x: 0, 
            opacity: 1,
            transition: { duration: 0.3 }
          }}
          className="text-secondary-light font-medium flex items-center transition-colors"
        >
          Read more
          <motion.div
            initial={{ x: 0 }}
            whileHover={{ 
              x: 3, 
              transition: { duration: 0.3, ease: "easeOut", repeat: 0 }
            }}
          >
            <ChevronRight className="ml-1 h-5 w-5" />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EntryCard;
