import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "wouter";
import GlassContainer from "@/components/GlassContainer";
import BackToHomeButton from "@/components/BackToHomeButton";
import { getEntry } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import ReactMarkdown from 'react-markdown';

const Entry: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: entry, isLoading, error } = useQuery({
    queryKey: ['/api/entries', slug],
    queryFn: () => getEntry(slug)
  });

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  return (
    <div className="w-full min-h-screen py-28 sm:py-25 md:py-22 px-4">
      <div className="max-w-3xl mx-auto">
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[300px]">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
          </div>
        ) : error ? (
          <GlassContainer>
            <p className="text-center text-destructive">
              Failed to load entry. Please try again later.
            </p>
          </GlassContainer>
        ) : entry ? (
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="glass rounded-2xl p-8 md:p-12 mb-8 fade-in"
          >
            <header className="mb-8">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-dark dark:text-white mb-4"
              >
                {entry.title}
              </motion.h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "4rem" }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="h-0.5 bg-accent mb-6"
              ></motion.div>
            </header>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="prose prose-sm sm:prose-base md:prose-lg dark:prose-invert max-w-none"
            >
              <ReactMarkdown>{entry.content}</ReactMarkdown>
            </motion.div>
          </motion.article>
        ) : (
          <GlassContainer>
            <p className="text-center">Entry not found.</p>
          </GlassContainer>
        )}

        {/* Back to home button */}
        <div className="flex justify-center">
          <BackToHomeButton />
        </div>
      </div>
    </div>
  );
};

export default Entry;
