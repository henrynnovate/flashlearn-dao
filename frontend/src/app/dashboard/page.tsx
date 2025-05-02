"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FaPlusCircle, FaRegBookmark, FaRocket, FaFire, FaSearch, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Enhanced Icon Component
const Icon = ({ icon: IconComponent, className, ...props }: any) => (
  <IconComponent className={className} {...props} />
);

// Loading Skeleton Component
const DeckSkeleton = () => (
  <div className="bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-xl p-6">
    <div className="animate-pulse flex flex-col space-y-4">
      <div className="h-8 bg-gray-200 rounded-full w-1/2 mx-auto" />
      <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto" />
      <div className="h-10 bg-gray-200 rounded-xl" />
    </div>
  </div>
);

// Progress bar component
const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
    <div
      className="h-full bg-blue-500"
      style={{ width: `${progress}%` }}
    />
  </div>
);

export default function DashboardPage() {
  const [loadingDecks, setLoadingDecks] = useState(true);
  const [decks, setDecks] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setDecks([1, 2]);
      setLoadingDecks(false);
    }, 2000);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Enhanced Header Section */}
        <motion.header 
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="flex justify-between items-center"
        >
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white">
                <FaUser className="text-xl" />
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
            </div>
            <div>
              <h1 className="text-xl font-semibold">John Doe</h1>
              <p className="text-sm text-gray-500">Pro Member</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <motion.input
                type="text"
                placeholder="Search decks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
                animate={{ width: searchQuery ? "240px" : "200px" }}
                transition={{ duration: 0.3 }}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
        </motion.header>

        {/* Enhanced Deck Section */}
        <motion.section 
          initial="hidden"
          animate="visible"
          variants={cardVariants}
          className="space-y-6"
        >
          <div className="flex justify-between items-center px-4">
            <h2 className="text-2xl font-bold text-gray-800">Your Flashcard Decks</h2>
            <select 
              className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Filter decks"
            >
              <option>All Decks</option>
              <option>Recent</option>
              <option>Favorites</option>
            </select>
          </div>

          {/* Create Deck Button */}
          <div className="text-right">
            <Button 
              className="bg-green-500 text-white px-6 py-2 rounded-lg"
              leftIcon={<FaPlusCircle />}
              aria-label="Create a new deck"
            >
              Create Deck
            </Button>
          </div>

          {loadingDecks ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <DeckSkeleton />
              <DeckSkeleton />
            </div>
          ) : decks.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <Icon 
                icon={FaRegBookmark}
                className="text-4xl text-gray-300 mx-auto"
                aria-hidden="true"
              />
              <p className="text-gray-500">No decks found. Create your first deck!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {decks.map((deck) => (
                <motion.div
                  key={deck}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                  whileHover={{ y: -5 }}
                  className="group bg-white/90 backdrop-blur-sm border border-gray-200/50 rounded-xl p-6 transition-all duration-300 hover:border-blue-200 hover:shadow-2xl"
                >
                  <div className="flex flex-col items-center space-y-5">
                    <div className="p-4 bg-blue-50 rounded-full relative group-hover:rotate-12 transition-transform">
                      <Icon 
                        icon={FaRegBookmark} 
                        className="text-4xl text-blue-500"
                        aria-label="Deck icon"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800">Deck {deck}</h3>
                    <div className="w-full space-y-3">
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>42 Cards</span>
                        <span>Last studied: 2h ago</span>
                      </div>
                      <ProgressBar progress={70} />
                      <div className="flex gap-4 mt-2">
                        <Button 
                          className="w-full bg-blue-500/90 hover:bg-blue-600 text-white py-2 rounded-xl transition-all duration-300 hover:shadow-lg"
                          aria-label={`Study Deck ${deck}`}
                        >
                          Continue
                        </Button>
                        <Button 
                          className="w-full bg-yellow-500/90 hover:bg-yellow-600 text-white py-4 rounded-xl transition-all duration-300 hover:shadow-lg"
                          aria-label={`Edit Deck ${deck}`}
                        >
                          Edit Deck
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      </div>
    </main>
  );
}
