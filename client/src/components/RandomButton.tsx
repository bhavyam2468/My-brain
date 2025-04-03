import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLocation } from "wouter";
import { Shuffle, Loader2 } from "lucide-react";
import { getRandomEntry } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const RandomButton: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const handleClick = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const entry = await getRandomEntry();
      if (entry) {
        navigate(`/thoughts/${entry.slug}`);
      } else {
        toast({
          title: "No entries found",
          description: "Unable to find a random entry. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error loading random entry:", error);
      toast({
        title: "Error",
        description: "Failed to load random entry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Even smoother, more subtle animations
  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 25px -10px rgba(0,0,0,0.3)",
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
    },
    tap: { 
      scale: 0.97,
      boxShadow: "0 5px 15px -8px rgba(0,0,0,0.3)",
      transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <motion.button
      variants={buttonVariants}
      initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
      animate={{ 
        opacity: 1, 
        y: 0,
        filter: "blur(0px)",
        transition: { 
          duration: 0.7, 
          ease: [0.16, 1, 0.3, 1],
          filter: { duration: 0.9 }
        }
      }}
      whileHover="hover"
      whileTap="tap"
      onClick={handleClick}
      disabled={isLoading}
      className="glass-button px-6 py-3 rounded-full text-white font-medium transition-all duration-300 inline-flex items-center"
    >
      {isLoading ? (
        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
      ) : (
        <Shuffle className="h-5 w-5 mr-2" />
      )}
      Give me something random
    </motion.button>
  );
};

export default RandomButton;
