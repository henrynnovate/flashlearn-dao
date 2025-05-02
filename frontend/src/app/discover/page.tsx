"use client";

import { useEffect, useState } from "react";
import { FaThumbsUp, FaThumbsDown, FaUser, FaSearch, FaRandom, FaFire, FaRocket } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const fakeDecks = [
  { id: 1, title: "Solidity Basics", author: "JaneDoe.eth", votes: 12, tags: ["web3", "blockchain"], popularity: "🔥 Hot" },
  { id: 2, title: "GRE Vocabulary", author: "SmartLearner.eth", votes: 8, tags: ["education", "test-prep"], popularity: "📚 Trending" },
  { id: 3, title: "Intro to Crypto", author: "VitalikFan", votes: 15, tags: ["crypto", "beginner"], popularity: "🚀 Popular" },
  { id: 4, title: "React Hooks", author: "ReactWizard", votes: 22, tags: ["webdev", "javascript"], popularity: "🔥 Hot" },
  { id: 5, title: "French Verbs", author: "LanguageMaster", votes: 5, tags: ["language", "french"], popularity: "New" },
  { id: 6, title: "Machine Learning", author: "AI_Enthusiast", votes: 18, tags: ["ai", "tech"], popularity: "🚀 Popular" },
];

export default function DiscoverDecksPage() {
  const [decks, setDecks] = useState(fakeDecks);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const tags = Array.from(new Set(fakeDecks.flatMap(deck => deck.tags)));

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleVote = (id: number, type: "up" | "down") => {
    setDecks(prev =>
      prev.map(deck =>
        deck.id === id
          ? {
              ...deck,
              votes: type === "up" ? deck.votes + 1 : deck.votes - 1,
            }
          : deck
      )
    );
  };

  const filteredDecks = decks.filter(deck => {
    const matchesSearch = deck.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         deck.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag ? deck.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  const getPopularityColor = (popularity: string) => {
    switch (popularity) {
      case "🔥 Hot": return "bg-orange-100 text-orange-600";
      case "🚀 Popular": return "bg-purple-100 text-purple-600";
      case "📚 Trending": return "bg-blue-100 text-blue-600";
      default: return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-white to-blue-50 px-4 py-8 sm:px-6 sm:py-10">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              Discover Amazing Decks
            </span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore community-created flashcard decks to boost your learning. Find your next study session!
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search decks or authors..."
                className="pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
              <FaRandom /> Random Deck
            </Button>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button 
              variant={!selectedTag ? "solid" : "outline"} 
              onClick={() => setSelectedTag(null)}
              className="transition-all"
            >
              All Decks
            </Button>
            {tags.map(tag => (
              <Button
                key={tag}
                variant={selectedTag === tag ? "solid" : "outline"}
                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                className="transition-all"
              >
                #{tag}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Decks Grid */}
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                className="h-64 bg-gray-100 rounded-xl animate-pulse"
              />
            ))}
          </div>
        ) : (
          <AnimatePresence>
            {filteredDecks.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredDecks.map((deck, index) => (
                  <motion.div
                    key={deck.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ y: -8, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md p-5 space-y-4 transition-all relative overflow-hidden group"
                  >
                    {/* Popularity badge */}
                    <span className={`absolute top-4 right-4 text-xs px-2 py-1 rounded-full ${getPopularityColor(deck.popularity)}`}>
                      {deck.popularity}
                    </span>
                    
                    <div className="space-y-3">
                      <h2 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                        {deck.title}
                      </h2>
                      <p className="text-sm text-gray-500 flex items-center gap-2">
                        <FaUser className="text-gray-400" /> {deck.author}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {deck.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <motion.button 
                          onClick={() => handleVote(deck.id, "up")}
                          whileTap={{ scale: 0.8 }}
                          className="text-blue-500 hover:text-blue-600 transition-colors"
                          aria-label="Upvote"
                        >
                          <FaThumbsUp />
                        </motion.button>
                        <span className={`font-medium ${deck.votes > 0 ? 'text-green-600' : deck.votes < 0 ? 'text-red-600' : 'text-gray-600'}`}>
                          {deck.votes}
                        </span>
                        <motion.button 
                          onClick={() => handleVote(deck.id, "down")}
                          whileTap={{ scale: 0.8 }}
                          className="text-red-500 hover:text-red-600 transition-colors"
                          aria-label="Downvote"
                        >
                          <FaThumbsDown />
                        </motion.button>
                      </div>
                      <Button 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white shadow-sm"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Study Now
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-16"
              >
                <div className="mx-auto w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
                  <FaSearch className="text-blue-500 text-3xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No decks found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
                <Button 
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedTag(null);
                  }}
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Reset Filters
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </main>
  );
}