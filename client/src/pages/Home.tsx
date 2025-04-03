import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import GlassContainer from "@/components/GlassContainer";
import EntryCard from "@/components/EntryCard";
import RandomButton from "@/components/RandomButton";
import { getAllEntries } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const Home: React.FC = () => {
  const { data: entries, isLoading, error } = useQuery({
    queryKey: ['/api/entries'],
    queryFn: getAllEntries
  });

  const scrollToContent = () => {
    document.getElementById("archive")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-screen px-4 text-center relative overflow-hidden">
        {/* Floating background shapes */}
        <motion.div 
          initial={{ opacity: 0.3 }}
          animate={{ opacity: 0.5 }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute inset-0 w-full h-full z-0 overflow-hidden"
        >
          <motion.div 
            className="absolute top-[15%] left-[15%] w-40 h-40 bg-purple-400 opacity-10 rounded-full filter blur-3xl" 
            animate={{ 
              x: [0, 30, 0],
              y: [0, -30, 0],
            }}
            transition={{ 
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute bottom-[20%] right-[10%] w-56 h-56 bg-blue-400 opacity-10 rounded-full filter blur-3xl" 
            animate={{ 
              x: [0, -40, 0],
              y: [0, 40, 0],
            }}
            transition={{ 
              duration: 17,
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute top-[55%] right-[25%] w-36 h-36 bg-teal-400 opacity-10 rounded-full filter blur-3xl" 
            animate={{ 
              x: [0, 50, 0],
              y: [0, 20, 0],
            }}
            transition={{ 
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute top-[30%] right-[55%] w-28 h-28 bg-pink-400 opacity-10 rounded-full filter blur-3xl" 
            animate={{ 
              x: [0, -20, 0],
              y: [0, 30, 0],
            }}
            transition={{ 
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute bottom-[35%] left-[20%] w-48 h-48 bg-emerald-400 opacity-10 rounded-full filter blur-3xl" 
            animate={{ 
              x: [0, 30, 0],
              y: [0, -40, 0],
            }}
            transition={{ 
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
        </motion.div>

        {/* Main content */}
        <motion.div 
          initial={{ opacity: 0, filter: "blur(15px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="glass max-w-3xl w-full p-8 md:p-10 rounded-2xl z-10"
        >
          <motion.h1
            initial={{ opacity: 0, filter: "blur(8px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-bold mb-1 text-primary-dark dark:text-white font-space uppercase"
          >
            WELCOME TO MY BRAIN
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, filter: "blur(5px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl text-gray-600 dark:text-gray-300 mb-5 font-inter"
          >
            Hope you brought snacks along!
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.8, filter: "blur(5px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToContent}
            className="glass-button px-6 py-3 rounded-full text-white font-medium transition-all duration-300"
          >
            Enter
          </motion.button>
        </motion.div>

        {/* Abstract background elements */}
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent opacity-10 dark:opacity-5 rounded-full filter blur-3xl"></div>
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-primary opacity-10 dark:opacity-5 rounded-full filter blur-3xl"></div>
      </section>

      {/* The Mind's Archive Section */}
      <section id="archive" className="py-20 px-4 md:px-8 relative overflow-hidden">
        {/* Subtle floating shapes for archive section */}
        <motion.div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-[10%] right-[5%] w-32 h-32 bg-indigo-400 opacity-5 rounded-full filter blur-2xl" 
            animate={{ 
              x: [0, -20, 0],
              y: [0, 15, 0],
            }}
            transition={{ 
              duration: 13,
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
          <motion.div 
            className="absolute bottom-[15%] left-[8%] w-40 h-40 bg-rose-400 opacity-5 rounded-full filter blur-2xl" 
            animate={{ 
              x: [0, 25, 0],
              y: [0, -20, 0],
            }}
            transition={{ 
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
        </motion.div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-3xl font-bold text-primary-dark dark:text-white mb-2">The Mind's Archive</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-12">Random thoughts, rants, poems and deep dives</p>

          {isLoading ? (
            <div className="flex justify-center items-center min-h-[300px]">
              <Loader2 className="h-12 w-12 text-primary animate-spin" />
            </div>
          ) : error ? (
            <GlassContainer>
              <p className="text-center text-destructive">
                Failed to load entries. Please try again later.
              </p>
            </GlassContainer>
          ) : entries && entries.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {entries.map((entry, index) => (
                <EntryCard key={entry.slug} entry={entry} index={index} />
              ))}
            </div>
          ) : (
            <GlassContainer>
              <p className="text-center">No entries found.</p>
            </GlassContainer>
          )}

          {/* Random thought button */}
          <div className="mt-16 text-center">
            <RandomButton />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
