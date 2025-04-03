import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import { X, Menu, Home, BookOpen, Sparkles, Loader2 } from "lucide-react";
import { getRandomEntry } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import SearchBar from "@/components/SearchBar";

const NavMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoadingRandom, setIsLoadingRandom] = useState(false);
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleRandomThought = async () => {
    if (isLoadingRandom) return;
    
    setIsLoadingRandom(true);
    try {
      const entry = await getRandomEntry();
      if (entry) {
        closeMenu();
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
      setIsLoadingRandom(false);
    }
  };

  // Smoother, more subtle animations
  const menuVariants = {
    hidden: { opacity: 0, scale: 0.96, x: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      x: 0, 
      transition: { 
        type: "tween", 
        duration: 0.4, 
        ease: "easeOut" 
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.96, 
      x: 10, 
      transition: { 
        type: "tween", 
        duration: 0.3, 
        ease: "easeInOut" 
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: { 
        delay: custom * 0.05, 
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  // Button hover animation - more subtle
  const buttonVariants = {
    hover: { 
      scale: 1.03,
      transition: { duration: 0.4, ease: "easeOut" }
    },
    tap: { 
      scale: 0.97,
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="fixed right-8 top-8 z-50 flex items-center space-x-3">
      <SearchBar />
      <motion.button
        onClick={toggleMenu}
        whileHover="hover"
        whileTap="tap"
        variants={buttonVariants}
        className="glass-button rounded-full p-3 transition-all duration-300"
        aria-label="Toggle navigation menu"
      >
        {isOpen ? <X size={22} /> : <Menu size={22} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="absolute top-14 right-0 mt-2 glass rounded-2xl overflow-hidden w-64"
          >
            <div className="p-6 space-y-3">
              <motion.div custom={1} variants={itemVariants} className="py-2">
                <Link
                  href="/"
                  className="flex items-center px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-all"
                  onClick={closeMenu}
                >
                  <Home size={18} className="mr-2" />
                  <span>Home</span>
                </Link>
              </motion.div>

              <motion.div custom={2} variants={itemVariants} className="py-2">
                <Link
                  href="/all"
                  className="flex items-center px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-all"
                  onClick={closeMenu}
                >
                  <BookOpen size={18} className="mr-2" />
                  <span>Browse All Entries</span>
                </Link>
              </motion.div>

              <motion.div custom={3} variants={itemVariants} className="py-2">
                <button
                  onClick={handleRandomThought}
                  disabled={isLoadingRandom}
                  className="flex items-center w-full px-4 py-2 rounded-lg text-white hover:bg-white/10 transition-all text-left"
                >
                  {isLoadingRandom ? (
                    <Loader2 size={18} className="mr-2 animate-spin" />
                  ) : (
                    <Sparkles size={18} className="mr-2" />
                  )}
                  <span>Random Thought</span>
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NavMenu;
