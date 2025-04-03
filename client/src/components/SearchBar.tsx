import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Loader2 } from "lucide-react";
import { searchEntries, type Entry } from "@/lib/utils";

const SearchBar: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [results, setResults] = useState<Entry[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [, navigate] = useLocation();

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const searchResults = await searchEntries(searchQuery);
      setResults(searchResults);
    } catch (error) {
      console.error("Error searching entries:", error);
    } finally {
      setIsSearching(false);
    }
  };

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle clicks outside the search component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleResultClick = (slug: string) => {
    navigate(`/thoughts/${slug}`);
    setIsOpen(false);
    setQuery("");
    setResults([]);
  };

  const toggleSearch = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    inputRef.current?.focus();
  };

  return (
    <div className="relative" ref={searchRef}>
      <button
        onClick={toggleSearch}
        className="p-3 rounded-full glass-button flex items-center justify-center"
        aria-label="Search"
      >
        <Search className="h-5 w-5 text-white" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, width: "200px" }}
            animate={{ opacity: 1, y: 0, width: "280px" }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-[calc(100%+10px)] right-0 z-50"
          >
            <div className="glass rounded-xl p-4 w-full">
              <div className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search thoughts..."
                  className="w-full bg-white/5 backdrop-blur-md text-white border border-white/20 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
                {query && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* Search results */}
              <AnimatePresence>
                {(results.length > 0 || isSearching) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-3 max-h-[50vh] overflow-y-auto"
                  >
                    {isSearching ? (
                      <div className="flex justify-center py-4">
                        <Loader2 className="h-6 w-6 text-white animate-spin" />
                      </div>
                    ) : results.length > 0 ? (
                      <div className="space-y-2">
                        {results.map((result) => (
                          <motion.div
                            key={result.slug}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="glass-card cursor-pointer rounded-lg p-3 hover:translate-y-[-2px] transition-all duration-200"
                            onClick={() => handleResultClick(result.slug)}
                          >
                            <h4 className="font-medium text-white mb-1 line-clamp-1">
                              {result.title}
                            </h4>
                            <p className="text-sm text-gray-300 line-clamp-2">
                              {result.description}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-center text-gray-400 py-3">No results found</p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;