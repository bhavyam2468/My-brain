
import React from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import GlassContainer from "@/components/GlassContainer";
import EntryCard from "@/components/EntryCard";
import BackToHomeButton from "@/components/BackToHomeButton";
import { getRandomEntries } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const AllEntries: React.FC = () => {
  const { data: entries, isLoading, error } = useQuery({
    queryKey: ['/api/entries/random'],
    queryFn: () => getRandomEntries(6)
  });

  return (
    <div className="w-full min-h-screen py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-primary-dark dark:text-white mb-4 text-center"
        >
          Random Entries
        </motion.h1>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="h-0.5 w-16 bg-accent mx-auto mb-12"
        ></motion.div>

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

        <div className="mt-16 text-center">
          <BackToHomeButton />
        </div>
      </div>
    </div>
  );
};

export default AllEntries;
